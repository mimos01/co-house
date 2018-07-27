webpackJsonp([0],{

/***/ 196:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 196;

/***/ }),

/***/ 241:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 241;

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__search_search__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile_profile__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(312);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsPage = /** @class */ (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__search_search__["a" /* SearchPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__profile_profile__["a" /* ProfilePage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/jonastorfs/Documents/Projecten/co-house/src/pages/tabs/tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Search" tabIcon="search"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Profile" tabIcon="contact"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/jonastorfs/Documents/Projecten/co-house/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Garden */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__ = __webpack_require__(160);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Garden = /** @class */ (function () {
    function Garden(value, name) {
        this.value = value;
        this.name = name;
    }
    return Garden;
}());

var SearchPage = /** @class */ (function () {
    function SearchPage(navCtrl, afs, alertCtrl) {
        this.navCtrl = navCtrl;
        this.afs = afs;
        this.alertCtrl = alertCtrl;
        this.gardenTst = Array();
        this.itemsCollectionCity = this.afs.collection('cities', function (ref) { return ref.where('country', '==', 'BE').orderBy('name_nl'); });
        this.cities = this.itemsCollectionCity.valueChanges();
        this.icons = "male_female";
    }
    SearchPage.prototype.ngOnInit = function () {
        this.showSearchBar = true;
    };
    SearchPage.prototype.getSelectedItem = function () {
        console.log("Log event value " + this.selectCity);
    };
    SearchPage.prototype.getSelectedItemGarden = function () {
        console.log("Log event garden " + this.garden);
    };
    SearchPage.prototype.getSelectedSmoker = function () {
        console.log("Log event smokers allowed " + this.smokers);
    };
    SearchPage.prototype.getSelectedItemPets = function () {
        console.log("Log event pets allowed " + this.pets_allowed);
    };
    SearchPage.prototype.getSelectedRoomFurnished = function () {
        console.log("Log event pets allowed " + this.room_furnished);
    };
    SearchPage.prototype.serchCoHouses = function () {
        console.log("Selected city " + this.selectCity);
        if (this.selectCity === undefined || this.selectCity == '') {
            console.log("PresentAlert");
            this.presentAlert("Stad selecteren", "Gelieve een stad te selecteren om te kunnen zoeken.");
        }
        else {
            console.log('Dont show alert');
            console.log("age From " + this.age_from);
            //switch to check selected values and to set boolean for query.
            switch (this.garden) {
                case "true": {
                    this.gardenResult = true;
                    break;
                }
                case "false": {
                    this.gardenResult = false;
                    break;
                }
                default: {
                    this.gardenResult = undefined;
                }
            }
            switch (this.room_furnished) {
                case "true": {
                    this.room_furnishedResult = true;
                    break;
                }
                case "false": {
                    this.room_furnishedResult = false;
                    break;
                }
                default: {
                    this.room_furnishedResult = undefined;
                }
            }
            switch (this.pets_allowed) {
                case "true": {
                    this.pets_allowedResult = true;
                    break;
                }
                case "false": {
                    this.pets_allowedResult = false;
                    break;
                }
                default: {
                    this.pets_allowedResult = undefined;
                }
            }
            console.log(this.gardenResult + "result");
            if (this.garden === 'true') {
                this.garden = '';
                console.log('Query house ');
                this.showSearchBar = false;
                this.itemsCollectionHouse = this.afs.collection('houses', function (ref) { return ref.where('garden', '==', true).orderBy('name'); });
                this.houses = this.itemsCollectionHouse.valueChanges();
                console.log('houses ' + this.houses);
            }
        }
    };
    SearchPage.prototype.searchAgain = function () {
        this.showSearchBar = true;
    };
    SearchPage.prototype.presentAlert = function (titleText, subtitleText) {
        var alert = this.alertCtrl.create({
            title: titleText,
            subTitle: subtitleText,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    SearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search',template:/*ion-inline-start:"/Users/jonastorfs/Documents/Projecten/co-house/src/pages/search/search.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Search\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n<div *ngIf="showSearchBar">\n  <ion-item>\n    <ion-label>Stad</ion-label>\n    <ion-select [(ngModel)]="selectCity" multiple="false" (ionChange)="getSelectedItem()" placeholder="Geen steden gevonden.">\n      <ion-option *ngFor="let city of cities | async" [value]="city.name_nl">{{city.name_nl}}</ion-option>\n    </ion-select>\n  </ion-item>\n\n  <ion-segment [(ngModel)]="icons" color="primary" class="segment">\n    <ion-segment-button value="male_only">\n      <ion-icon name="man"></ion-icon>\n    </ion-segment-button>\n    <ion-segment-button value="female_only">\n      <ion-icon name="woman"></ion-icon>\n    </ion-segment-button>\n    <ion-segment-button isActive="true" value="male_female">\n      <ion-icon name="man"></ion-icon>\n      <ion-icon name="woman"></ion-icon>\n    </ion-segment-button>\n  </ion-segment>\n\n  <ion-item>\n    <ion-label>Tuin</ion-label>\n    <ion-select [(ngModel)]="garden" multiple="false" (ionChange)="getSelectedItemGarden()">\n      <ion-option value="true">Met tuin</ion-option>\n      <ion-option value="false">Zonder tuin</ion-option>\n      <ion-option value="undefined">Niet belangrijk</ion-option>\n    </ion-select>\n  </ion-item> \n\n  <ion-item>\n    <ion-label>Huisdieren toegelaten</ion-label>\n    <ion-select [(ngModel)]="pets_allowed" multiple="false" (ionChange)="getSelectedItemPets()">\n      <ion-option [value]="true">Toegelaten</ion-option>\n      <ion-option [value]="false">Niet toegelaten</ion-option>\n      <ion-option [value]="undefined">Niet belangrijk</ion-option>\n    </ion-select>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>Kamer bemeubeld</ion-label>\n    <ion-select [(ngModel)]="room_furnished" multiple="false" (ionChange)="getSelectedRoomFurnished()">\n      <ion-option [value]="true">Bemeubeld</ion-option>\n      <ion-option [value]="false">Niet bemeumeld</ion-option>\n      <ion-option [value]="undefined">Niet belangrijk</ion-option>\n    </ion-select>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>Rokers toegelaten</ion-label>\n    <ion-toggle [(ngModel)]="smokers" (ionChange)="getSelectedSmoker()"></ion-toggle>\n  </ion-item>\n\n\n  <ion-item>\n    <ion-label>Leeftijd </ion-label>\n    <ion-input [(ngModel)]="age_from" type="number" placeholder="Van"></ion-input>\n    <ion-input [(ngModel)]="age_to" type="number" placeholder="Tot"></ion-input>\n  </ion-item>\n\n  <ion-item>\n      <ion-label>Max prijs per maand</ion-label>\n      <ion-input [(ngModel)]="max-price" type="number" placeholder="prijs"></ion-input>\n  </ion-item>\n\n  <div text-center class="button-layout">\n    <button ion-button color="primary" class="searchButton" outline round (click)="serchCoHouses()">Zoek co-houses </button>\n  </div>\n</div>\n\n<div *ngIf="!showSearchBar">\n    <div text-center class="button-layout">\n        <button ion-button color="primary" class="searchButton" outline round (click)="searchAgain()"> Opnieuw zoeken </button>\n      </div>\n\n    <div class="house" *ngFor="let house of houses | async">\n    <ion-card (click)="navigateToHouseDetail(house)">\n      <img src="../../assets/imgs/house_test_1.jpeg" />\n      <ion-card-content>\n        <ion-card-title text-wrap class="houseName">\n          {{house.name}}\n        </ion-card-title>\n        <p text-wrap class="price">\n          € {{house.price_month}} per maand\n        </p>\n      </ion-card-content>\n    </ion-card>\n  </div>\n</div>\n</ion-content>'/*ion-inline-end:"/Users/jonastorfs/Documents/Projecten/co-house/src/pages/search/search.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__["a" /* AngularFirestore */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], SearchPage);
    return SearchPage;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, afAuth, alertCtrl) {
        /* if (this.afAuth.authState) {
           this.showLogin = true;
           console.log('False: ' + this.showLogin);
           console.log('auth ' + this.afAuth.authState)
         } else {
           this.showLogin = false;
         }*/
        var _this = this;
        this.navCtrl = navCtrl;
        this.afAuth = afAuth;
        this.alertCtrl = alertCtrl;
        this.afAuth.auth.onAuthStateChanged(function (user) {
            if (user) {
                _this.showLogin = false;
                console.log("showLogin user is false " + _this.showLogin);
            }
            else {
                _this.showLogin = true;
                console.log("showLogin user is true " + _this.showLogin);
            }
        });
    }
    ProfilePage.prototype.ngOnInit = function () {
    };
    ProfilePage.prototype.login = function () {
        var _this = this;
        console.log("username " + this.username);
        if (this.username == '' || this.password == '' || this.username === undefined || this.password === undefined) {
            this.presentAlert("Inloggen", "Uw e-mailadres en wachtwoord moeten ingevuld zijn om te kunnen aanmelden.");
            //this.showLogin = true;
        }
        else {
            this.afAuth.auth.signInWithEmailAndPassword(this.username, this.password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-email') {
                    _this.presentAlert('Inloggen mislukt', 'Het ingegeven email of wachtwoord is foutief, gelieve opnieuw te proberen.');
                }
                else if (errorCode === 'auth/user-disabled' || errorCode === 'auth/user-not-found') {
                    _this.presentAlert('Account niet gevonden', 'Uw account werd niet gevonden, gelieve support te contacteren als u denkt dat dit een fout is.');
                }
                else {
                    alert(errorMessage);
                }
                console.log(error);
            });
            // this.showLogin = false;
            console.log("register show " + this.showLogin);
        }
    };
    ProfilePage.prototype.signUp = function () {
        var _this = this;
        console.log("username register " + this.username);
        if (this.username == '' || this.password == '' || this.username === undefined || this.password === undefined) {
            this.presentAlert("Registreren", "Gelieve uw emailadres in te vullen en een wachtwoord te kiezen om u te registreren.");
            //this.showLogin=true;
        }
        else {
            this.afAuth.auth.createUserWithEmailAndPassword(this.username, this.password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/email-already-in-use') {
                    _this.presentAlert('Ongeldig e-mailadres ', 'Het ingegeven e-mailadres bestaat al. Druk op forgot password als u uw wachtwoord vergeten bent.');
                }
                else if (errorCode === 'auth/invalid-email') {
                    _this.presentAlert('E-mailadres niet geldig', 'Het ingegeven e-mailadres is niet geldig.');
                }
                else if (errorCode === 'auth/weak-password') {
                    _this.presentAlert('Wachtwoord niet geldig', 'Het ingegeven wachtwoord is niet sterk genoeg, probeer cijfers en letters te combineren in uw wachtwoord.');
                }
                else {
                    _this.presentAlert('Ongekende fout ', errorMessage);
                }
                console.log(error);
            });
            // this.showLogin = false;
            console.log("register after signup show " + this.showLogin);
        }
    };
    ProfilePage.prototype.loginUserWithGoogle = function () {
        if (!window.cordova) {
            return this.afAuth.auth.signInWithPopup(new __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"].GoogleAuthProvider());
        }
        else {
            __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().signInWithRedirect(new __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"].GoogleAuthProvider).then(function () {
                return __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().getRedirectResult();
            }).then(function (result) {
                // This gives you a Google Access Token.
                // You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // ...
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
            });
        }
    };
    ProfilePage.prototype.presentAlert = function (titleText, subtitleText) {
        var alert = this.alertCtrl.create({
            title: titleText,
            subTitle: subtitleText,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"/Users/jonastorfs/Documents/Projecten/co-house/src/pages/profile/profile.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content padding class="login" style="background-image:url(\'../../assets/imgs/background.jpg\');background-repeat: no-repeat;background-size: 100% 100%">\n\n  <div *ngIf="showLogin">\n    <ion-grid>\n      <ion-row>\n        <ion-col col-2></ion-col>\n        <ion-col col-10 style="margin-left: auto;margin-right: auto;display: block;">\n          <img class="logo" src="../../assets/imgs/co-house-logo.png">\n        </ion-col>\n        <ion-col col-2></ion-col>\n      </ion-row>\n    </ion-grid>\n\n    <ion-list class="list-form" style="margin-bottom: 30px">\n\n      <ion-item style="padding:0px !important; border-bottom:none !important;border-top:none;font-size: 14px;margin-top:10px;background:none;border-bottom:1px solid white;box-shadow:none;">\n        <ion-input [(ngModel)]="username" style="color: #9C9495 ;border-bottom-color: #9C9495 ;box-shadow:none;" type="email" placeholder="E-mail"></ion-input>\n      </ion-item>\n      <ion-item style="padding:0px !important; font-size: 14px;margin-top:10px;background:none;border-bottom:1px solid  #9C9495 ;box-shadow:none;">\n        <ion-input [(ngModel)]="password" style="color: #9C9495 ;border-bottom-color: #9C9495  #9C9495 ;box-shadow:none;" type="password"\n          placeholder="Password"></ion-input>\n      </ion-item>\n\n    </ion-list>\n\n    <button class="loginButton" color="primary" ion-button block round (click)="login()">Login</button>\n    <button ion-button round style="margin-top:20px;height: 35px;font-size: 14px;" block (click)="signUp()">Registreren</button>\n\n    <div text-center style="text-decoration: underline;margin-top:20px;color: #9C9495 ;font-size: 14px;" (click)="forgotPwd()">Forgot Password</div>\n   \n    \n      <button class="socialLogin" ion-button block round color="danger" (click)="loginUserWithGoogle()">\n        <ion-icon name="logo-googleplus"></ion-icon>\n        Login with Google\n      </button>\n\n      <button ion-button block round color="facebook" (click)="loginUserWitFacebook()">\n        <ion-icon name="logo-facebook"></ion-icon>\n        Login with Facebook\n      </button>\n    \n  </div>\n\n  <div *ngIf=\'!showLogin\'>\n      <ion-grid>\n          <ion-row>\n            <ion-col col-2></ion-col>\n            <ion-col col-10 style="margin-left: auto;margin-right: auto;display: block;">\n              <img class="logo" src="../../assets/imgs/co-house-logo.png">\n            </ion-col>\n            <ion-col col-2></ion-col>\n          </ion-row>\n        </ion-grid>\n    \n        <ion-list class="list-form" style="margin-bottom: 30px">\n    \n          <ion-item style="padding:0px !important; border-bottom:none !important;border-top:none;font-size: 14px;margin-top:10px;background:none;border-bottom:1px solid white;box-shadow:none;">\n            <ion-input [(ngModel)]="username" style="color: #9C9495 ;border-bottom-color: #9C9495 ;box-shadow:none;" type="email" placeholder="Username"></ion-input>\n          </ion-item>\n          <ion-item style="padding:0px !important; font-size: 14px;margin-top:10px;background:none;border-bottom:1px solid  #9C9495 ;box-shadow:none;">\n            <ion-input [(ngModel)]="password" style="color: #9C9495 ;border-bottom-color: #9C9495  #9C9495 ;box-shadow:none;" type="password"\n              placeholder="Password"></ion-input>\n          </ion-item>\n    \n        </ion-list>\n    \n      <p> REGISter test</p>\n        \n  </div>\n</ion-content>'/*ion-inline-end:"/Users/jonastorfs/Documents/Projecten/co-house/src/pages/profile/profile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__houseDetail_houseDetail__ = __webpack_require__(313);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, afs) {
        this.navCtrl = navCtrl;
        this.afs = afs;
        this.itemsCollectionProvince = afs.collection('provinces', function (ref) { return ref.where('country', '==', 'BE').orderBy('name_nl'); });
        // .valueChanges() is simple. It just returns the 
        // JSON data without metadata. If you need the 
        // doc.id() in the value you must persist it your self
        // or use .snapshotChanges() instead. See the addItem()
        // method below for how to persist the id with
        // valueChanges()
        this.provinces = this.itemsCollectionProvince.valueChanges();
        this.itemsCollectionHouse = afs.collection('houses', function (ref) { return ref.limit(10); });
        this.houses = this.itemsCollectionHouse.valueChanges();
        var housesT = String(this.houses);
        for (var _i = 0, housesT_1 = housesT; _i < housesT_1.length; _i++) {
            var house = housesT_1[_i];
            console.log(house);
        }
    }
    /*addItem(name: string) {
      // Persist a document id
      const id = this.afs.createId();
      const province: Province = { id, name };
      this.itemsCollection.doc(id).set(province);
    }*/
    HomePage.prototype.navigateToHouseDetail = function (house) {
        console.log("Navigate to next page");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__houseDetail_houseDetail__["a" /* HouseDetailPage */], {
            house: house
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/jonastorfs/Documents/Projecten/co-house/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ul>\n    <li *ngFor="let province of provinces | async">\n      <h3 text-wrap> Woningen in {{ province.name_nl }} </h3>\n      <ion-scroll scrollX="true">\n        <div class="house" *ngFor="let house of houses | async">\n          <ion-card (click)="navigateToHouseDetail(house)" *ngIf="province.name_nl ==  house.province">\n            <img src="../../assets/imgs/house_test_1.jpeg" />\n            <ion-card-content>\n              <ion-card-title text-wrap class="houseName">\n                {{house.name}}\n              </ion-card-title>\n              <p text-wrap class="price">\n                € {{house.price_month}} per maand\n              </p>\n            </ion-card-content>\n          </ion-card>\n        </div>\n      </ion-scroll>\n    </li>\n  </ul>\n\n\n</ion-content>'/*ion-inline-end:"/Users/jonastorfs/Documents/Projecten/co-house/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__["a" /* AngularFirestore */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HouseDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(61);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
//import { Observable } from 'rxjs/Observable';
var HouseDetailPage = /** @class */ (function () {
    function HouseDetailPage(navCtrl, navParam) {
        this.navCtrl = navCtrl;
        this.navParam = navParam;
        this.house = [];
        this.house = navParam.get('house');
        // this.imageList.push(this.business.images);
    }
    HouseDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-house-detail',template:/*ion-inline-start:"/Users/jonastorfs/Documents/Projecten/co-house/src/pages/houseDetail/houseDetail.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>\n            Detail\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-card class="card-detail">\n        <img src="../../assets/imgs/house_test_1.jpeg" />\n        <ion-card-content>\n            <ion-card-title>\n                {{house.name}}\n            </ion-card-title>\n            <p class="price">\n                € {{house.price_month}} per maand\n            </p>\n            <p class="city-name">\n                Gelegen in: {{house.city}}\n            </p>\n            <p class="adress" text-wrap>\n                {{house.adress}}\n            </p>\n            <h3>Omschrijving woonst</h3>\n            <p class="houseDescription">\n                {{house.description}}\n            </p>\n\n            <h3>Info over de bewoners</h3>\n            <p>\n                {{house.residents}}\n            </p>\n\n            <h3>\n                Extra info\n            </h3>\n            <ul text-wrap class="extra-info">\n                <li *ngIf="house.garden"> Woning met tuin</li>\n                \n                <li *ngIf="house.only_female"> Alleen vrouwen gezocht</li>\n                <li *ngIf="house.only_male"> Alleen mannen gezocht</li>\n                \n                <li> Gezochte leeftijd: {{house.age_from}} tot {{house.age_to}} jaar</li>\n                <li> Aantal inwoners: {{house.number_of_residents}}</li>\n                \n                <li *ngIf="!house.pets_allowed">Geen huisdieren toegelaten </li>\n                <li *ngIf="house.pets_allowed">Huisdieren toegelaten </li>\n                \n                <li *ngIf="!house.smoker_allowed">Niet rokers gezocht</li>\n\n            </ul>\n        </ion-card-content>\n    </ion-card>\n</ion-content>'/*ion-inline-end:"/Users/jonastorfs/Documents/Projecten/co-house/src/pages/houseDetail/houseDetail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], HouseDetailPage);
    return HouseDetailPage;
}());

//# sourceMappingURL=houseDetail.js.map

/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(342);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_search_search__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_profile_profile__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_houseDetail_houseDetail__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__environments_environment__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_angularfire2_firestore__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angularfire2_storage__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angularfire2_auth__ = __webpack_require__(309);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











//Add all firebase and AngularFire relations here





var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_houseDetail_houseDetail__["a" /* HouseDetailPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_11_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_12__environments_environment__["a" /* environmentDEV */].firebase),
                __WEBPACK_IMPORTED_MODULE_13_angularfire2_firestore__["b" /* AngularFirestoreModule */],
                __WEBPACK_IMPORTED_MODULE_15_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_14_angularfire2_storage__["a" /* AngularFireStorageModule */] // imports firebase/storage only needed for storage features
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_houseDetail_houseDetail__["a" /* HouseDetailPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_13_angularfire2_firestore__["a" /* AngularFirestore */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(285);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/jonastorfs/Documents/Projecten/co-house/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/jonastorfs/Documents/Projecten/co-house/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 471:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environmentDEV; });
var environmentDEV = {
    production: false,
    firebase: {
        apiKey: "AIzaSyD4BQmbgyHOxdCzaypJxli13NHFWiU1Qtw",
        authDomain: "co-housedev.firebaseapp.com",
        databaseURL: "https://co-housedev.firebaseio.com",
        projectId: "co-housedev",
        storageBucket: "co-housedev.appspot.com",
        messagingSenderId: "969322480434"
    }
};
//# sourceMappingURL=environment.js.map

/***/ })

},[335]);
//# sourceMappingURL=main.js.map