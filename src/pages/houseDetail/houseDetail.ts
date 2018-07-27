import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, App, Tabs, IonicPage } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

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
  segment: 'detail/:homeId'
})
@Component({
  selector: 'detail-page',
  templateUrl: 'houseDetail.html'
})
export class HouseDetailPage implements OnInit {
  private itemsCollectionHouse: AngularFirestoreCollection<House>;
  public house: any = [];
  public houseId;
  houses: Observable<House[]>;

  constructor(public navCtrl: NavController, public navParam: NavParams, private app: App, private afs: AngularFirestore) {
    console.log('here we are!')
  }

  ngOnInit() {
    console.log("Entered detailPage");
    var houseId2 = String(this.navParam.data.homeId);
    console.log('houseId2 : ' + houseId2)
    this.houseId = this.navParam.get('homeId');
    console.log('homeId ' + this.houseId )

    this.itemsCollectionHouse = this.afs.collection<House>('houses', ref => ref.where(firebase.firestore.FieldPath.documentId(), '==', String(this.houseId)));
    this.houses = this.itemsCollectionHouse.valueChanges();
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


}