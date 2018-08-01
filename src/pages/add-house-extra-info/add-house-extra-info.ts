import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { NavController, NavParams, AlertController, App, Tabs } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';


import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';

import { AddHouseService } from '../shared-service/add-house.service';
import { UserService } from '../shared-service/user.service';
import * as firebase from 'firebase/app';

//import { House} from '../interfaces/house';
import { City } from '../interfaces/city';
import { DiscountCode } from '../interfaces/discountCode';

export interface House {
  province: string;
  postalCode: string;
  city: string;
  street: string;
  icons: string;
  garden: boolean;
  smoker_allowed: boolean;
  pets_allowed: boolean;
  room_furnished: boolean;
  age_from: number;
  age_to: number;
  price_month: number;
  name: string;
  description: string;
  residents: string;
  number_of_residents: number;
  email: string;
  uid: string;
  valid_until: string;
}

export class Images {
  image: string;
}

@Component({
  selector: 'page-add-house-extra-info',
  templateUrl: 'add-house-extra-info.html'
})

export class AddHouseExtraInfoPage implements OnInit {
  imagePaths: Array<string>;
  imagePathsBase64: Array<string>;
  nameDescription: string;
  houseDescription: string;
  residentsDescription: string;
  number_of_residents: number;

  discount_code: string;
  discountCodeNotOK: string;
  discountCodeOK: string;
  discountCodes;

  discountCoderesult;

  price: string;
  current_date;

  docRef;
  filesToUpload: Array<File> = [];
  filesAdded: Array<File> = [];

  private itemsCollectionDiscountCode: AngularFirestoreCollection<DiscountCode>;
  private itemsCollectionCity: AngularFirestoreCollection<City>
  cities

  houseRef;

  images: Array<string> = [];
  imagesArray;
  newFirebaseArray = [];

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public alertCtrl: AlertController, public navParam: NavParams,
    public imagePicker: ImagePicker, public addHouseObject: AddHouseService, public afs: AngularFirestore, public userService: UserService,
    public datePipe: DatePipe, public storage: AngularFireStorage, private app: App, public http: Http, public httpClient: HttpClient) {
    this.price = "9,99";

  }

  ngOnInit() {
    console.log("House object " + this.addHouseObject.province);
  }

  navigateHome() {
    const tabsNav = this.app.getNavByIdOrName('myNavigation') as Tabs;
    tabsNav.select(0);
    this.app.navPop();
  }

  add() {
    const tabsNav = this.app.getNavByIdOrName('myNavigation') as Tabs;
    tabsNav.select(2);
    this.app.navPop();
  }

  checkPaymentWeb() {
 //this.http.get('https://us-central1-co-housedev.cloudfunctions.net/pay')  
 this.httpClient.get('https://us-central1-co-housedev.cloudfunctions.net/pay')
  //this.http.get('http://localhost:5001/co-housedev/us-central1/pay')
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured: "  + err);
        })
  }

  addCouHouse() {
    console.log("Age from begore save: " + this.addHouseObject.age_from);
    console.log("WHY? " + this.addHouseObject.price_month);
    switch (this.number_of_residents) {
      case undefined: {
        this.number_of_residents = 0;
        break;
      }
      default: {
        this.number_of_residents = 0;
      }
    }

    this.current_date = new Date();
    console.log("Current date: " + this.current_date);

    const coHouse = this.afs.collection<House>('houses');
    coHouse.add({
      province: this.addHouseObject.province,
      postalCode: this.addHouseObject.postalCode,
      city: this.addHouseObject.cityFromPostalCode,
      street: this.addHouseObject.street,
      icons: this.addHouseObject.icons,
      garden: this.addHouseObject.garden,
      smoker_allowed: this.addHouseObject.smokers,
      pets_allowed: this.addHouseObject.pets_allowed,
      room_furnished: this.addHouseObject.room_furnished,
      age_from: this.addHouseObject.age_from,
      age_to: this.addHouseObject.age_to,
      price_month: this.addHouseObject.price_month,
      name: this.nameDescription,
      description: this.houseDescription,
      residents: this.residentsDescription,
      number_of_residents: this.number_of_residents,
      email: this.userService.userEmail,
      uid: this.userService.uid,
      valid_until: this.datePipe.transform(this.current_date.setMonth(this.current_date.getMonth() + 3), 'yyyy-MM-dd'),
    }).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      this.docRef = docRef.id;

      var metadata = {
        contentType: 'image/jpeg',
      };

      this.addCity();

      this.docRef = docRef.id;
      const firebaseRef = firebase.firestore().collection('houses').doc(this.docRef);

      if (this.imagePaths && this.imagePaths.length) {

        for (var i = 0; i < this.imagePaths.length; i++) {
          console.log("Adding photo's" + this.imagePaths[i]);
          const filePath = 'images/' + docRef.id + '/' + i + '.jpg';
          const ref = this.storage.ref(filePath);
          // const task = ref.put(this.imagePaths[i], metadata).then((snapshot) => {
          const task = ref.putString(this.imagePaths[i], 'base64').then((snapshot) => {
            // const task = ref.put(imageBlob).then((snapshot) => {
            console.log('Uploaded an image!');
            const downloadUrl = ref.getDownloadURL();
            console.log("downloadURL: " + downloadUrl);

            downloadUrl.subscribe(url => {
              if (url) {
                console.log(url);
                //this.newFirebaseArray.push({downloadUdrl: url});
                const imageData = { downloadUrl: url };

                this.afs.firestore.runTransaction((t) => {
                  return t.get(firebaseRef).then((doc) => {
                    // doc doesn't exist; can't update
                    if (!doc.data().images2) {
                      console.log("if images2 not found");
                      t.set(firebaseRef, { 'images2': [imageData] }, { merge: true });
                    } else {
                      console.log("If images2 found");
                      //const newImagesArray = doc.get('images2').push( {downloadUrl: url} );
                      const existingImages = doc.data().images2;
                      existingImages.push(imageData);
                      t.set(firebaseRef, { images2: existingImages }, { merge: true });
                    }

                  });
                }).then(function () {
                  console.log("Transaction successfully committed!");
                }).catch(function (error) {
                  console.log("Transaction failed: ", error);
                });
              }
            })
          });
        }
      }
    }).catch((error) => {
      console.error("Error adding document: ", error);
      this.presentAlert('Fout bij opslagen', 'Er ging iets mis met het opslagen van uw woning info, gelieve nog eens te proberen.');
    });
    console.log("Outside function loop: " + this.docRef);
  }

  addImages() {
    let optionsBase64 = {
      maximumImagesCount: 10,
      outputType: 1
    };

    let options = {
      maximumImagesCount: 10,
      outputType: 1
    }
    this.imagePaths = new Array<string>();
    this.imagePathsBase64 = new Array<string>();

    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        let image = results[i];
        this.imagePaths.push(results[i]);
      }
    }, (err) => { console.log("Coulden't get picture") },
    );
  }

  verifyDiscount() {
    if (this.discount_code === undefined || this.discount_code === '') {
      this.discountCodeNotOK = 'Ongeldige kortingscode';
      this.price = '9,99';
      this.discountCodeOK = '';
    } else {
      this.itemsCollectionDiscountCode = this.afs.collection<DiscountCode>('discount_code', ref => ref.where('code', '==', this.discount_code.toUpperCase()).where('valid', '==', true));
      this.itemsCollectionDiscountCode.valueChanges().subscribe(discountCode => {
        this.discountCodes = discountCode;
        console.log(this.discountCodes);

        if (this.discountCodes.length > 0) {
          console.log("In if loop");
          for (let code of this.discountCodes) {
            console.log("for loop " + code.code);
            this.discountCodeOK = 'Geldige kortingscode';
            this.discountCodeNotOK = '';
            this.price = "0,00";
          }
        } else {
          console.log("No discount code found");
          this.discountCodeNotOK = 'Ongeldige kortingscode';
          this.price = '9,99';
          this.discountCodeOK = '';
        }
      });
    }
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  addCouHouseWeb() {
    switch (this.number_of_residents) {
      case undefined: {
        this.number_of_residents = 0;
        break;
      }
      default: {
        this.number_of_residents = 0;
      }
    }

    this.current_date = new Date();
    const coHouse = this.afs.collection<House>('houses');

    coHouse.add({
      province: this.addHouseObject.province,
      postalCode: this.addHouseObject.postalCode,
      city: this.addHouseObject.cityFromPostalCode,
      street: this.addHouseObject.street,
      icons: this.addHouseObject.icons,
      garden: this.addHouseObject.garden,
      smoker_allowed: this.addHouseObject.smokers,
      pets_allowed: this.addHouseObject.pets_allowed,
      room_furnished: this.addHouseObject.room_furnished,
      age_from: this.addHouseObject.age_from,
      age_to: this.addHouseObject.age_to,
      price_month: this.addHouseObject.price_month,
      name: this.nameDescription,
      description: this.houseDescription,
      residents: this.residentsDescription,
      number_of_residents: this.number_of_residents,
      email: this.userService.userEmail,
      uid: this.userService.uid,
      valid_until: this.datePipe.transform(this.current_date.setMonth(this.current_date.getMonth() + 3), 'yyyy-MM-dd')
    }).then((docRef) => {
      this.addCity();

      this.docRef = docRef.id;
      const firebaseRef = firebase.firestore().collection('houses').doc(this.docRef);

      if (this.filesToUpload && this.filesToUpload.length) {
        for (var i = 0; i < this.filesToUpload.length; i++) {
          const filePath = 'images/' + docRef.id + '/' + i + '.jpg';
          const ref = this.storage.ref(filePath);
          const task = ref.put(this.filesToUpload[i]).then((snapshot) => {


            const downloadUrl = ref.getDownloadURL();

            downloadUrl.subscribe(url => {
              if (url) {
                const imageData = { downloadUrl: url };

                this.afs.firestore.runTransaction((t) => {
                  return t.get(firebaseRef).then((doc) => {
                    // doc doesn't exist; can't update
                    if (!doc.data().images2) {
                      console.log("if images2 not found");
                      t.set(firebaseRef, { 'images2': [imageData] }, { merge: true });
                    } else {
                      console.log("If images2 found");
                      //const newImagesArray = doc.get('images2').push( {downloadUrl: url} );
                      const existingImages = doc.data().images2;
                      existingImages.push(imageData);
                      t.set(firebaseRef, { images2: existingImages }, { merge: true });
                    }

                  });
                }).then(function () {
                  console.log("Transaction successfully committed!");
                }).catch(function (error) {
                  console.log("Transaction failed: ", error);
                });
              }
            })
          });
        }
      }
    }).catch((error) => {
      console.error("Error adding document: ", error);
      this.presentAlert('Fout bij opslagen', 'Er ging iets mis met het opslagen van uw woning info, gelieve nog eens te proberen.');
    });
    console.log("Outside function loop: " + this.docRef);

  }

  addCity() {
    this.itemsCollectionCity = this.afs.collection<City>('cities', ref => ref.where('name_nl', '==', this.addHouseObject.cityFromPostalCode));
    this.itemsCollectionCity.valueChanges().subscribe(city => {
      this.cities = city;

      if (this.cities.length > 0) {
        console.log("In if loop");
        for (let city of this.cities) {
          console.log("for loop " + city.name_nl);
          console.log("city exists")

        }
      } else {
        const city = this.afs.collection<City>('cities');
        city.add({
          country: "BE",
          name_nl: this.addHouseObject.cityFromPostalCode
        })
      }
    });
  }

  presentAlert(titleText, subtitleText) {
    let alert = this.alertCtrl.create({
      title: titleText,
      subTitle: subtitleText,
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
