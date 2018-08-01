import { Component } from '@angular/core';
import { NavController, App, Tabs, IonicPage } from 'ionic-angular';
import { DatePipe } from '@angular/common'

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import { HouseDetailPage } from '../houseDetail/houseDetail';

import { House } from '../interfaces/house';
import { Province } from '../interfaces/province';

@IonicPage({
  segment: ''
})
@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomePage {
  private itemsCollectionProvince: AngularFirestoreCollection<Province>;
  private itemsCollectionHouse: AngularFirestoreCollection<House>;

  provinces: Observable<Province[]>;
  houses: Observable<House[]>;

  imagePath;
  current_date;
  images;

  constructor(public navCtrl: NavController, private readonly afs: AngularFirestore, public afAuth: AngularFireAuth, private app: App, private datePipe: DatePipe) {
    this.itemsCollectionProvince = afs.collection<Province>('provinces', ref => ref.where('country', '==', 'BE').orderBy('name_nl'));
    this.provinces = this.itemsCollectionProvince.valueChanges();

    this.current_date = new Date();
    let currentDateFormatted = this.datePipe.transform(this.current_date, 'yyyy-MM-dd');


    this.itemsCollectionHouse = afs.collection<House>('houses', ref => ref.where('valid_until', '>', currentDateFormatted));

    this.houses = this.itemsCollectionHouse.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as House;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  navigateHome() {
    const tabsNav = this.app.getNavByIdOrName('myNavigation') as Tabs;
    tabsNav.select(0);
    this.app.navPop();
  }

  navigateToHouseDetail(house) {
    console.log("Navigate to next page");
    this.navCtrl.push(HouseDetailPage, {
      'homeId': house.id,
    });
  }

  add() {
    const tabsNav = this.app.getNavByIdOrName('myNavigation') as Tabs;
    tabsNav.select(2);
    this.app.navPop();
  }

}
