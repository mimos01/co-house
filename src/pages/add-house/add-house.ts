import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, App, Tabs } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { AddHouseExtraInfoPage } from '../add-house-extra-info/add-house-extra-info';

import { AddHouseService } from '../shared-service/add-house.service';

import { House } from '../interfaces/house';
import { City } from '../interfaces/city';

export class Garden {

    constructor(value: string, name: string) {
        this.value = value;
        this.name = name;
    }

    value: string;
    name: string;
}


@Component({
    selector: 'page-add-house',
    templateUrl: 'add-house.html'
})
export class AddHousePage implements OnInit {

    private itemsCollectionCity: AngularFirestoreCollection<City>;
    cities: Observable<City[]>;
    private itemsCollectionHouse: AngularFirestoreCollection<House>;
    houses: Observable<House[]>;

    province: string;
    postalCode: string;
    cityFromPostalCode: string;
    street: string;
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
    data;

    constructor(public navCtrl: NavController, public afs: AngularFirestore, public alertCtrl: AlertController, private http: HttpClient,
        public addHouseObject: AddHouseService, private app: App) {

        this.icons = "male_female";
        this.smokers = false;

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

    getPostalCode() {

        if (this.postalCode.length == 4) {

            this.http.get("https://api.zippopotam.us/be/" + this.postalCode).subscribe(
                data => { this.data = data },
                err => console.error(err),
                () => this.cityFromPostalCode = this.data["places"][0]["place name"])
        }
    }

    nextPage() {
        /* Uncomment after complete process of adding house is complete add check for age from and until
            if(this.province === undefined || this.province === '' || this.postalCode === undefined || this.postalCode === '' || this.postalCode.length < 4 || this.cityFromPostalCode === undefined || this.cityFromPostalCode === ''){
                this.presentAlert("Ongeldige postcode","Gelieve een geldige postcode in te geven.")
                console.log("Postcode =  " + this.postalCode)
                console.log("City from postal code = " + this.cityFromPostalCode);
            } else if(this.garden === undefined || this.pets_allowed === undefined || this.room_furnished === undefined || this.smokers === undefined || this.max_price === undefined || this.max_price <= 0 ){
                this.presentAlert("Niet alle velden zijn ingevuld.","Gelieve alle verplichte velden (*) in te vullen.");
                console.log("Max price = " + this.max_price)
            } else {*/

        //switch to check selected values and to set boolean for query.
        console.log("garden value: " + this.garden);
        switch (this.garden) {
            case "true": {
                this.addHouseObject.garden = true;
                break;
            }
            case "not_true": {
                this.addHouseObject.garden = false;
                break;
            } default: {
                this.addHouseObject.garden = false;
            }
        }

        switch (this.room_furnished) {
            case "true": {
                this.addHouseObject.room_furnished = true;
                break;
            }
            case "not_true": {
                this.addHouseObject.room_furnished = false;
                break;
            } default: {
                this.addHouseObject.room_furnished = false;
            }
        }

        console.log("pets allowed " + this.pets_allowed);
        switch (this.pets_allowed) {
            case "true": {
                this.addHouseObject.pets_allowed = true;
                break;
            }
            case "not_true": {
                this.addHouseObject.pets_allowed = false;
                break;
            } default: {
                this.addHouseObject.pets_allowed = false;
            }
        }

        console.log('smokers ' + this.smokers);
        console.log('max price ' + this.max_price);

        this.addHouseObject.province = this.province;
        this.addHouseObject.postalCode = this.postalCode;
        this.addHouseObject.cityFromPostalCode = this.cityFromPostalCode;
        this.addHouseObject.street = this.street;
        this.addHouseObject.icons = this.icons;
        this.addHouseObject.smokers = this.smokers;
        this.addHouseObject.price_month = this.max_price;

        console.log('object ' + this.addHouseObject.price_month);

        if (this.age_from == undefined) {
            this.addHouseObject.age_from = 0;
        } else {
            this.addHouseObject.age_from = this.age_from
        }
        if (this.age_to == undefined) {
            this.addHouseObject.age_to = 0;
        } else {
            this.addHouseObject.age_to = this.age_to;
        }
        this.navCtrl.push(AddHouseExtraInfoPage, {

        });

    }

    presentAlert(titleText, subtitleText) {
        let alert = this.alertCtrl.create({
            title: titleText,
            subTitle: subtitleText,
            buttons: ['OK']
        });
        alert.present();
    }
}
