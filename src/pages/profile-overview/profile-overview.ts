import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, App, Tabs, IonicPage, IonicApp } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { ProfilePage } from '../profile/profile';
import { AddHousePage } from '../add-house/add-house';

import { MyHouses } from '../my-houses/my-houses';

import { UserService } from '../shared-service/user.service';

export interface House {
  id: string;
  name: string;
  description: string;
  province: string;
  city: string;
  age_from: number;
  age_to: number;
  garden: boolean;
  number_of_residents: number;
  only_female: boolean;
  only_male: boolean;
  smoker_allowed: boolean;
  price_month: number;
  residents: string;
  pets_allowed: boolean;
  images: object;
}

@IonicPage({
  segment: 'profile-overview'
})

@Component({
  selector: 'page-profile-overview',
  templateUrl: 'profile-overview.html'
})
export class ProfileOverviewPage implements OnInit {
  private itemsCollectionHouse: AngularFirestoreCollection<House>;
  houses: Observable<House[]>;


  constructor(public navCtrl: NavController, public afs: AngularFirestore, public afAuth: AngularFireAuth, public alertCtrl: AlertController, public userService: UserService,
    private app: App) {
    this.afAuth.auth.onAuthStateChanged(
      (user) => {
        if (user) {
          this.userService.userEmail = user.email;
        } else {
          this.userService.userEmail = '';
          this.navCtrl.setRoot(ProfilePage);
        }
      });
  }

  ngOnInit() {
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


  addCoHouse() {
    this.navCtrl.push(AddHousePage);
  }

  logout() {
    this.afAuth.auth.signOut().catch((error) => {
      // Handle Errors here.
      console.log("handle errors here");
      this.presentAlert("Afmelden niet gelukt.", 'Er ging iets mis bij het afmelden, probeer het later opnieuw.');
    });
  }

  alertDelete() {
    let alert = this.alertCtrl.create({
      title: 'Verwijder account',
      message: 'Als u uw account verwijderd worden ook alle woningen die u heeft toegevoegd verwijderd.',
      buttons: [
        {
          text: 'Annuleren',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Bevestigen',
          handler: () => {
            console.log('Buy clicked');
            var user = firebase.auth().currentUser;

            user.delete().then(() => {
              // User deleted.
              this.deleteAccount();
            }).catch((error) => {
              this.presentAlert('Fout bij verwijderen', 'Oeps, er ging iets mis bij het verwijderen van uw account. Gelieve eerst af te melden en opnieuw aan te melden als dit probleem zich blijft voordoen.');
            });

          }
        }
      ]
    });
    alert.present();
  }

  async deleteAccount() {
    var db = firebase.firestore();
    var housesRef = db.collection('houses');
    var qry: firebase.firestore.QuerySnapshot = await housesRef.where('email', '==', this.userService.userEmail).get();

    const batch = this.afs.firestore.batch();

    qry.forEach(doc => {
      batch.delete(doc.ref);
    });
    batch.commit()
    .catch(err => console.log(`failed with ${err.message}`))
  }

  myHouses(house) {
    console.log("Navigate to next page");
    this.navCtrl.push(MyHouses, {
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
