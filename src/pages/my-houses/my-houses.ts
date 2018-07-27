import { Component } from '@angular/core';
import { NavController, App, Tabs, IonicPage } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import { HouseDetailPage } from '../houseDetail/houseDetail';
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
  segment: 'my-houses'
})

@Component({
  selector: 'my-houses',
  templateUrl: 'my-houses.html'
})
export class MyHouses {
  private itemsCollectionHouse: AngularFirestoreCollection<House>;
  houses: Observable<House[]>;

  imagePath;
  current_date;
  images;


  constructor(public navCtrl: NavController, private readonly afs: AngularFirestore, public afAuth: AngularFireAuth, private app: App, private userService: UserService) {
    this.itemsCollectionHouse = afs.collection<House>('houses', ref => ref.where('email', '==', this.userService.userEmail));
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
