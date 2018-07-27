import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, App, Tabs, IonicPage } from 'ionic-angular';
import { trigger, state, style, transition, animate } from '@angular/animations'

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase/app';
import { CollectionReference } from '../../../node_modules/@firebase/firestore-types';

export interface City {
  id: string;
  name: string;
  country: string;
}

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
}

export class Garden {

  constructor(value: string, name: string) {
    this.value = value;
    this.name = name;
  }

  value: string;
  name: string;
}

@IonicPage({
  segment: 'search'
})

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  animations: [
    trigger('myvisibility', [
      state('visible', style({
        height: '*',
        opacity: 1
      })),
      state('invisible', style({
        height: '0px',
        display: 'none',
        opacity: 0
      })),
      //transition('* => *', animate('.5s ease'))
      transition('invisible => visible', animate('1000ms ease-in')),
      transition('visible => invisible', animate('1000ms ease-out'))
    ])
  ]
})


export class SearchPage implements OnInit {
  private itemsCollectionCity: AngularFirestoreCollection<City>;
  cities: Observable<City[]>;
  private itemsCollectionHouse: AngularFirestoreCollection<House>;
  // houses: Observable<House[]>;
  houses;

  selectCity: string;
  icons: string;
  garden: string;
  smokers: boolean;
  pets_allowed: string;
  room_furnished: string;
  age_from: number;
  age_to: number;
  max_price: number;

  gardenResult: boolean;
  pets_allowedResult: boolean;
  room_furnishedResult: boolean;

  showSearchBar: boolean;
  gardenTst = Array<Garden>();

  visibleStateSearchbar = "visible";
  visibleStateButton = "invisible";

  constructor(public navCtrl: NavController, public afs: AngularFirestore, public alertCtrl: AlertController, private app: App) {
    this.itemsCollectionCity = this.afs.collection<City>('cities', ref => ref.where('country', '==', 'BE').orderBy('name_nl'));
    this.cities = this.itemsCollectionCity.valueChanges();

    this.icons = "male_female";

  }

  ngOnInit() {

    //  this.showSearchBar = true;
    this.visibleStateSearchbar = "visible";
    this.visibleStateButton = "invisible";

    console.log("icons : " + this.icons);

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

  serchCoHouses() {
    console.log("Selected city " + this.selectCity);
    if (this.selectCity === undefined || this.selectCity == '') {
      console.log("PresentAlert");
      this.presentAlert("Stad selecteren", "Gelieve een stad te selecteren om te kunnen zoeken.")
    } else {
      console.log('Dont show alert');
      console.log("age From " + this.age_from);

      //switch to check selected values and to set boolean for query.
      switch (this.garden) {
        case "true": {
          this.gardenResult = true;
          break;
        }
        case "not_true": {
          this.gardenResult = false;
          break;
        } default: {
          this.gardenResult = undefined;
        }
          console.log('Garden result ' + this.gardenResult);
      }

      switch (this.room_furnished) {
        case "true": {
          this.room_furnishedResult = true;
          break;
        }
        case "not_true": {
          this.room_furnishedResult = false;
          break;
        } default: {
          this.room_furnishedResult = undefined;
        }
          console.log('Room furnished ' + this.room_furnishedResult);
      }

      switch (this.pets_allowed) {
        case "true": {
          this.pets_allowedResult = true;
          break;
        }
        case "not_true": {
          this.pets_allowedResult = false;
          break;
        } default: {
          this.pets_allowedResult = undefined;
        }
          console.log('Pets allowed:' + this.pets_allowedResult);
      }

      var myArray = [];
      var whereString;
     // var query = firebase.firestore().collection('houses') as CollectionReference;

      if (this.gardenResult == true || this.gardenResult == false) {
        myArray.push('"garden", "==", ' + this.gardenResult);
     //  query = query.where('garden', '==', true)
      }
      if (this.room_furnishedResult == true || this.room_furnishedResult == false) {
        myArray.push('"room_furnished", "==", ' + this.room_furnishedResult);
      }
      if (this.pets_allowedResult == true || this.pets_allowedResult == false) {
        myArray.push('"pets_allowed", "==", ' + this.pets_allowedResult);
      }

      for (var i = 0; i <= myArray.length; i++) {
        whereString = whereString + ".where(myArray[i])"
      }

      var query = (firebase.firestore().collection('houses') + whereString) as CollectionReference;

      console.log('Firebase collection string: ' + firebase.firestore().collection('houses') + whereString);
      console.log('query: ' + query)

   
      query.where('','==','')
      console.log('query:  ' + query);
    /*  query.get().then(querySnapshot => {
        this.houses = querySnapshot
      });*/

      this.visibleStateButton = "visible";
      this.visibleStateSearchbar = "invisible";

      // this.itemsCollectionHouse = this.afs.collection<House>('houses', ref => ref.where('garden','==', true));
      // this.houses = this.itemsCollectionHouse.valueChanges();

      console.log('houses: ' + this.houses)
      //console.log('houses : ' + this.houses)
      //this.houses = this.itemsCollectionHouse.valueChanges();

      /*  this.itemsCollectionH ouse = this.afs.collection<House>('houses', ref => ref
        .orderBy('name'));
  
        this.houses = this.itemsCollectionHouse.valueChanges();*/

      /* if (this.gardenResult == undefined && this.room_furnishedResult == undefined && this.pets_allowedResult == undefined) {
         this.itemsCollectionHouse = this.afs.collection<House>('houses', ref => ref.where('garden', '==', true)
           .where('garden', '==', false)
           .where('room_furnished', '==', true)
           .where('room_furnished', '==', false)
           .where('pets_allowed', '==', true)
           .where('pets_allowed', '==', false)
           .orderBy('name'));
         this.houses = this.itemsCollectionHouse.valueChanges();
 
         console.log("Query for undefined");
 
         this.visibleStateButton = "visible";
         this.visibleStateSearchbar = "invisible";
       }*/



      //Als query volledig werkt, subscribe op resultaat om te zien of er iets terug gekomen is of niet!!! 
      //Anders in UI melding geven dat er geen woning is gevonden. 

      /* if (this.gardenResult === true || this.gardenResult === false && this.room_furnishedResult === true || this.room_furnishedResult === false
         && this.pets_allowedResult === true || this.pets_allowedResult === false && this.smokers === true || this.smokers === false) {
         this.garden = '';
         console.log('Query house ');
         //this.showSearchBar = false;
         this.visibleStateButton = "visible";
         this.visibleStateSearchbar = "invisible";
         this.itemsCollectionHouse = this.afs.collection<House>('houses', ref => ref.where('garden', '==', this.gardenResult).orderBy('name'));
         this.houses = this.itemsCollectionHouse.valueChanges();
         console.log('houses ' + this.houses)
       }*/

    }
  }

  searchAgain() {
    this.visibleStateButton = "invisible";
    this.visibleStateSearchbar = "visible";
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
