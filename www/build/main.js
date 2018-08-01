webpackJsonp([0],{

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__profile_overview_profile_overview__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_service_user_service__ = __webpack_require__(85);
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
    function ProfilePage(navCtrl, afAuth, alertCtrl, userService, app) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.afAuth = afAuth;
        this.alertCtrl = alertCtrl;
        this.userService = userService;
        this.app = app;
        this.afAuth.auth.onAuthStateChanged(function (user) {
            if (user) {
                _this.userService.userEmail = user.email;
                _this.userService.uid = user.uid;
                _this.showLogin = false;
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__profile_overview_profile_overview__["a" /* ProfileOverviewPage */], {
                    user: user
                });
            }
            else {
                _this.showLogin = true;
                console.log("showLogin user is true " + _this.showLogin);
            }
        });
    }
    ProfilePage.prototype.ngOnInit = function () {
    };
    ProfilePage.prototype.navigateHome = function () {
        var tabsNav = this.app.getNavByIdOrName('myNavigation');
        tabsNav.select(0);
        this.app.navPop();
    };
    ProfilePage.prototype.add = function () {
        var tabsNav = this.app.getNavByIdOrName('myNavigation');
        tabsNav.select(2);
        this.app.navPop();
    };
    ProfilePage.prototype.login = function () {
        var _this = this;
        if (this.username == '' || this.password == '' || this.username === undefined || this.password === undefined) {
            this.presentAlert("Inloggen", "Uw e-mailadres en wachtwoord moeten ingevuld zijn om te kunnen aanmelden.");
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
            console.log("register show " + this.showLogin);
        }
    };
    ProfilePage.prototype.signUp = function () {
        var _this = this;
        console.log("username register " + this.username);
        if (this.username == '' || this.password == '' || this.username === undefined || this.password === undefined) {
            this.presentAlert("Registreren", "Gelieve uw emailadres in te vullen en een wachtwoord te kiezen om u te registreren.");
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
            this.afAuth.auth.onAuthStateChanged(function (user) {
                if (user) {
                    _this.showLogin = false;
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__profile_overview_profile_overview__["a" /* ProfileOverviewPage */], {
                        user: user
                    });
                }
                else {
                    _this.showLogin = true;
                    console.log("showLogin user is true " + _this.showLogin);
                }
            });
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
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
            });
        }
    };
    ProfilePage.prototype.loginUserWitFacebook = function () {
        if (!window.cordova) {
            return this.afAuth.auth.signInWithPopup(new __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"].FacebookAuthProvider());
        }
        else {
            __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().signInWithRedirect(new __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"].FacebookAuthProvider).then(function () {
                return __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().getRedirectResult();
            }).then(function (result) {
                // This gives you a Google Access Token.
                // You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
            });
        }
    };
    ProfilePage.prototype.logout = function () {
        var _this = this;
        this.afAuth.auth.signOut().catch(function (error) {
            // Handle Errors here.
            console.log("handle errors here");
            _this.presentAlert("Afmelden niet gelukt.", 'Er ging iets mis bij het afmelden, probeer het later opnieuw.');
        });
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
            selector: 'page-profile',template:/*ion-inline-start:"/Users/jonastorfs/Documents/Projecten/co-house-pwa/src/pages/profile/profile.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title (click)="navigateHome()">CO-HOUSE</ion-title>\n    <ion-buttons right>\n      <button class="add" (click)="add()">\n        <ion-icon name="add"></ion-icon>\n      </button>\n      <button class="addWebsite" (click)="add()">\n        <h5>ADD NEW HOUSE</h5>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="login" style="background-image:url(\'assets/imgs/background.jpg\');background-repeat: no-repeat;background-size: 100% 100%">\n  <ion-grid>\n    <div *ngIf="showLogin">\n\n      <ion-row>\n        <ion-col col-2></ion-col>\n        <ion-col col-10 style="margin-left: auto;margin-right: auto;display: block;">\n          <img class="logo" src="assets/imgs/co-house-logo.png">\n        </ion-col>\n        <ion-col col-2></ion-col>\n      </ion-row>\n\n\n      <ion-list class="list-form" style="margin-bottom: 30px">\n\n        <ion-item class="emailTxt" style="padding:0px !important; border-bottom:none !important;border-top:none;font-size: 14px;margin-top:10px;background:none;border-bottom:1px solid white;box-shadow:none;">\n          <ion-input [(ngModel)]="username" style="color: #9C9495 ;border-bottom-color: #9C9495 ;box-shadow:none;" type="email" placeholder="E-mail"></ion-input>\n        </ion-item>\n        <ion-item class="passwordTxt" style="padding:0px !important; font-size: 14px;margin-top:10px;background:none;border-bottom:1px solid  #9C9495 ;box-shadow:none;">\n          <ion-input [(ngModel)]="password" style="color: #9C9495 ;border-bottom-color: #9C9495  #9C9495 ;box-shadow:none;" type="password"\n            placeholder="Password"></ion-input>\n        </ion-item>\n\n      </ion-list>\n\n      <button class="loginButton" color="primary" ion-button block round (click)="login()">Login</button>\n      <button class="registerButton" ion-button round style="margin-top:20px;height: 35px;font-size: 14px;" block (click)="signUp()">Registreren</button>\n\n      <div class="forgotPassword" text-center style="text-decoration: underline;margin-top:20px;color: #9C9495 ;font-size: 14px;"\n        (click)="forgotPwd()">Forgot Password</div>\n\n\n      <button class="socialLogin" ion-button block round color="danger" (click)="loginUserWithGoogle()">\n        <ion-icon name="logo-googleplus"></ion-icon>\n        Login with Google\n      </button>\n\n      <button class="socialLoginFB" ion-button block round color="facebook" (click)="loginUserWitFacebook()">\n        <ion-icon name="logo-facebook"></ion-icon>\n        Login with Facebook\n      </button>\n      <ion-label class="info" text-wrap>Login of maak een account aan om een woning toe te voegen.</ion-label>\n    </div>\n  </ion-grid>\n</ion-content>'/*ion-inline-end:"/Users/jonastorfs/Documents/Projecten/co-house-pwa/src/pages/profile/profile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5__shared_service_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddHouseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AddHouseService = /** @class */ (function () {
    function AddHouseService() {
    }
    AddHouseService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], AddHouseService);
    return AddHouseService;
}());

//# sourceMappingURL=add-house.service.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HouseDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(69);
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




var HouseDetailPage = /** @class */ (function () {
    function HouseDetailPage(navCtrl, navParam, app, afs) {
        this.navCtrl = navCtrl;
        this.navParam = navParam;
        this.app = app;
        this.afs = afs;
        this.house = [];
        console.log('here we are!');
    }
    HouseDetailPage.prototype.ngOnInit = function () {
        var _this = this;
        console.log("Entered detailPage");
        var houseId2 = String(this.navParam.data.homeId);
        console.log('houseId2 : ' + houseId2);
        this.houseId = this.navParam.get('homeId');
        console.log('homeId ' + this.houseId);
        this.itemsCollectionHouse = this.afs.collection('houses', function (ref) { return ref.where(__WEBPACK_IMPORTED_MODULE_3_firebase_app__["firestore"].FieldPath.documentId(), '==', String(_this.houseId)); });
        this.houses = this.itemsCollectionHouse.valueChanges();
    };
    HouseDetailPage.prototype.navigateHome = function () {
        var tabsNav = this.app.getNavByIdOrName('myNavigation');
        tabsNav.select(0);
        this.app.navPop();
    };
    HouseDetailPage.prototype.add = function () {
        var tabsNav = this.app.getNavByIdOrName('myNavigation');
        tabsNav.select(2);
        this.app.navPop();
    };
    HouseDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'detail-page',template:/*ion-inline-start:"/Users/jonastorfs/Documents/Projecten/co-house-pwa/src/pages/houseDetail/houseDetail.html"*/'<ion-header>\n        <ion-navbar>\n                <ion-title (click)="navigateHome()">CO-HOUSE</ion-title>\n                <ion-buttons right>\n                  <button class="add" (click)="add()">\n                    <ion-icon name="add"></ion-icon>\n                  </button>\n                  <button class="addWebsite" (click)="add()">\n                   <h5>ADD NEW HOUSE</h5>\n                    </button>\n                </ion-buttons>\n              </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-card class="card-detail" *ngFor=\'let house of houses | async\'>\n        <ion-slides class="imageSliderHouse2" pager>\n            <ion-slide *ngFor="let image of house.images2">\n                <img  class="img_card" [src]="image.downloadUrl" />\n            </ion-slide>\n          </ion-slides>\n        <ion-card-content>\n            <ion-card-title>\n                {{house.name}}\n            </ion-card-title>\n            <p class="email">\n                Contacteer eigenaar: <a href="mailto:{{house.email}}"> {{house.email}} </a>\n                </p>\n            <p class="price">\n                € {{house.price_month}} per maand\n            </p>\n            <p class="city-name">\n                Gelegen in: {{house.city}} , {{house.street}}\n            </p>\n           <!-- <p class="adress" text-wrap>\n                {{house.street}}\n            </p>-->\n            <h3>Omschrijving woonst</h3>\n            <p class="houseDescription">\n                {{house.description}}\n            </p>\n\n            <h3>Info over de bewoners</h3>\n            <p>\n                {{house.residents}}\n            </p>\n\n            <h3>\n                Extra info\n            </h3>\n            <ul text-wrap class="extra-info">\n                <li *ngIf="house.garden"> Woning met tuin</li>\n                \n                <li *ngIf="house.icons == \'female_only\'"> Alleen vrouwen gezocht</li>\n                <li *ngIf="house.icons == \'male_only\'"> Alleen mannen gezocht</li>\n                \n                <li> Gezochte leeftijd: {{house.age_from}} tot {{house.age_to}} jaar</li>\n                <li> Aantal inwoners: {{house.number_of_residents}}</li>\n                \n                <li *ngIf="!house.pets_allowed">Geen huisdieren toegelaten </li>\n                <li *ngIf="house.pets_allowed">Huisdieren toegelaten </li>\n                \n                <li *ngIf="!house.smoker_allowed">Niet rokers gezocht</li>\n\n            </ul>\n        </ion-card-content>\n    </ion-card>\n</ion-content>'/*ion-inline-end:"/Users/jonastorfs/Documents/Projecten/co-house-pwa/src/pages/houseDetail/houseDetail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__["a" /* AngularFirestore */]])
    ], HouseDetailPage);
    return HouseDetailPage;
}());

//# sourceMappingURL=houseDetail.js.map

/***/ }),

/***/ 209:
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
webpackEmptyAsyncContext.id = 209;

/***/ }),

/***/ 255:
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
webpackEmptyAsyncContext.id = 255;

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__search_search__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile_profile__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(23);
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
    function TabsPage(platform, navParams) {
        this.tabsPlacement = 'bottom';
        this.tabsLayout = 'icon-top';
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__search_search__["a" /* SearchPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__profile_profile__["a" /* ProfilePage */];
        this.mySelectedIndex = navParams.data.tabIndex || 0;
        if (!platform.is('mobile')) {
            this.tabsPlacement = 'top';
            this.tabsLayout = 'icon-left';
        }
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/jonastorfs/Documents/Projecten/co-house-pwa/src/pages/tabs/tabs.html"*/'<ion-tabs [tabsPlacement]="tabsPlacement" [tabsLayout]="tabsLayout" name="myNavigation">\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home" tabUrl></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Search" tabIcon="search"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Profile" tabIcon="contact"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/jonastorfs/Documents/Projecten/co-house-pwa/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["h" /* NavParams */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Garden */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_animations__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_service_search_house__ = __webpack_require__(321);
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
    function SearchPage(searchHouse, navCtrl, afs, alertCtrl, app) {
        this.searchHouse = searchHouse;
        this.navCtrl = navCtrl;
        this.afs = afs;
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.gardenTst = Array();
        this.visibleStateSearchbar = "visible";
        this.visibleStateButton = "invisible";
        this.itemsCollectionCity = this.afs.collection('cities', function (ref) { return ref.where('country', '==', 'BE').orderBy('name_nl'); });
        this.cities = this.itemsCollectionCity.valueChanges();
        this.icons = "male_female";
    }
    SearchPage.prototype.ngOnInit = function () {
        //  this.showSearchBar = true;
        this.visibleStateSearchbar = "visible";
        this.visibleStateButton = "invisible";
        console.log("icons : " + this.icons);
    };
    SearchPage.prototype.navigateHome = function () {
        var tabsNav = this.app.getNavByIdOrName('myNavigation');
        tabsNav.select(0);
        this.app.navPop();
    };
    SearchPage.prototype.add = function () {
        var tabsNav = this.app.getNavByIdOrName('myNavigation');
        tabsNav.select(2);
        this.app.navPop();
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
                case "not_true": {
                    this.gardenResult = false;
                    break;
                }
                default:
                    {
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
                }
                default:
                    {
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
                }
                default:
                    {
                        this.pets_allowedResult = undefined;
                    }
                    console.log('Pets allowed:' + this.pets_allowedResult);
            }
        }
        this.searchHouses();
    };
    SearchPage.prototype.searchHouses = function () {
        var _this = this;
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
            whereString = whereString + ".where(myArray[i])";
        }
        var query = this.searchHouse.getHouses(whereString);
        console.log('Query: ' + query);
        query.get().then(function (querySnapshot) {
            _this.houses = querySnapshot;
        });
        // var query = (firebase.firestore().collection('houses') + whereString) as CollectionReference;
        /* query.where('', '==', '')
         console.log('query:  ' + query);*/
        /*  query.get().then(querySnapshot => {
            this.houses = querySnapshot
          });*/
        this.visibleStateButton = "visible";
        this.visibleStateSearchbar = "invisible";
    };
    SearchPage.prototype.searchAgain = function () {
        this.visibleStateButton = "invisible";
        this.visibleStateSearchbar = "visible";
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
            selector: 'page-search',template:/*ion-inline-start:"/Users/jonastorfs/Documents/Projecten/co-house-pwa/src/pages/search/search.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title (click)="navigateHome()">CO-HOUSE</ion-title>\n        <ion-buttons right>\n          <button class="add" (click)="add()">\n            <ion-icon name="add"></ion-icon>\n          </button>\n          <button class="addWebsite" (click)="add()">\n           <h5>ADD NEW HOUSE</h5>\n            </button>\n        </ion-buttons>\n      </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <!-- <div  *ngIf="showSearchBar"> -->\n\n<ion-grid class="searchContainer">\n  <div [@myvisibility]="visibleStateSearchbar">\n\n    <ion-item>\n      <ion-label>Stad</ion-label>\n      <ion-select [(ngModel)]="selectCity" multiple="false" placeholder="Geen steden gevonden.">\n        <ion-option *ngFor="let city of cities | async" [value]="city.name_nl">{{city.name_nl}}</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-segment [(ngModel)]="icons" color="primary" class="segment">\n      <ion-segment-button value="male_only">\n        <ion-icon name="man"></ion-icon>\n      </ion-segment-button>\n      <ion-segment-button value="female_only">\n        <ion-icon name="woman"></ion-icon>\n      </ion-segment-button>\n      <ion-segment-button isActive="true" value="male_female">\n        <ion-icon name="man"></ion-icon>\n        <ion-icon name="woman"></ion-icon>\n      </ion-segment-button>\n    </ion-segment>\n\n    <ion-item>\n      <ion-label>Tuin</ion-label>\n      <ion-select [(ngModel)]="garden" multiple="false">\n        <ion-option value="true">Met tuin</ion-option>\n        <ion-option value="not_true">Zonder tuin</ion-option>\n        <ion-option value="undefined">Niet belangrijk</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Huisdieren toegelaten</ion-label>\n      <ion-select [(ngModel)]="pets_allowed" multiple="false">\n        <ion-option [value]="true">Toegelaten</ion-option>\n        <ion-option [value]="not_true">Niet toegelaten</ion-option>\n        <ion-option [value]="undefined">Niet belangrijk</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Kamer bemeubeld</ion-label>\n      <ion-select [(ngModel)]="room_furnished" multiple="false">\n        <ion-option [value]="true">Bemeubeld</ion-option>\n        <ion-option [value]="not_true">Niet bemeumeld</ion-option>\n        <ion-option [value]="undefined">Niet belangrijk</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Rokers toegelaten</ion-label>\n      <ion-toggle [(ngModel)]="smokers"></ion-toggle>\n    </ion-item>\n\n\n    <ion-item>\n      <ion-label>Leeftijd </ion-label>\n      <ion-input [(ngModel)]="age_from" type="number" placeholder="Van"></ion-input>\n      <ion-input [(ngModel)]="age_to" type="number" placeholder="Tot"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Max prijs per maand</ion-label>\n      <ion-input [(ngModel)]="max_price" type="number" placeholder="prijs"></ion-input>\n    </ion-item>\n\n    <div text-center class="button-layout">\n      <button ion-button color="primary" class="searchButton" outline round (click)="serchCoHouses()">Zoek co-houses </button>\n    </div>\n  </div>\n\n</ion-grid>\n\n  <!--<div *ngIf="!showSearchBar">-->\n  <div [@myvisibility]="visibleStateButton">\n    <div text-center class="button-layout">\n      <button ion-button color="primary" class="searchButton" outline round (click)="searchAgain()"> Opnieuw zoeken </button>\n    </div>\n\n    <div *ngIf="houses">\n      <div class="house" *ngFor="let house of houses">\n        <ion-card (click)="navigateToHouseDetail(house)">\n          <img src="../../assets/imgs/house_test_1.jpeg" />\n          <ion-card-content>\n            <ion-card-title text-wrap class="houseName">\n              {{house.name}}\n            </ion-card-title>\n            <p text-wrap class="price">\n              € {{house.price_month}} per maand\n            </p>\n          </ion-card-content>\n        </ion-card>\n      </div>\n    </div>\n    <div *ngIf="!houses">\n    <ion-card>\n      <ion-card-content>\n        <ion-card-title text-wrap class="houseName">\n          Geen woning gevonden\n        </ion-card-title>\n        <p text-wrap class="price">\n          We konden geen woning vinden voor uw huidige selectie, probeer opnieuw te zoeken.\n        </p>\n      </ion-card-content>\n    </ion-card>\n</div>  \n  </div>\n</ion-content>'/*ion-inline-end:"/Users/jonastorfs/Documents/Projecten/co-house-pwa/src/pages/search/search.html"*/,
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["j" /* trigger */])('myvisibility', [
                    Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["g" /* state */])('visible', Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["h" /* style */])({
                        height: '*',
                        opacity: 1
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["g" /* state */])('invisible', Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["h" /* style */])({
                        height: '0px',
                        display: 'none',
                        opacity: 0
                    })),
                    //transition('* => *', animate('.5s ease'))
                    Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["i" /* transition */])('invisible => visible', Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["e" /* animate */])('1000ms ease-in')),
                    Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["i" /* transition */])('visible => invisible', Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["e" /* animate */])('1000ms ease-out'))
                ])
            ]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__shared_service_search_house__["a" /* SearchHouseService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_service_search_house__["a" /* SearchHouseService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__["a" /* AngularFirestore */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__["a" /* AngularFirestore */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]) === "function" && _e || Object])
    ], SearchPage);
    return SearchPage;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchHouseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase_app__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var SearchHouseService = /** @class */ (function () {
    function SearchHouseService() {
    }
    SearchHouseService.prototype.getHouses = function (searchString) {
        console.log('searchString: ' + searchString);
        return (__WEBPACK_IMPORTED_MODULE_1_firebase_app__["firestore"]().collection('houses') + searchString);
        //return firebase.firestore() + searchString;
    };
    SearchHouseService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], SearchHouseService);
    return SearchHouseService;
}());

//# sourceMappingURL=search-house.js.map

/***/ }),

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileOverviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__profile_profile__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__add_house_add_house__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__my_houses_my_houses__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_service_user_service__ = __webpack_require__(85);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









var ProfileOverviewPage = /** @class */ (function () {
    function ProfileOverviewPage(navCtrl, afs, afAuth, alertCtrl, userService, app) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.afs = afs;
        this.afAuth = afAuth;
        this.alertCtrl = alertCtrl;
        this.userService = userService;
        this.app = app;
        this.afAuth.auth.onAuthStateChanged(function (user) {
            if (user) {
                _this.userService.userEmail = user.email;
            }
            else {
                _this.userService.userEmail = '';
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__profile_profile__["a" /* ProfilePage */]);
            }
        });
    }
    ProfileOverviewPage.prototype.ngOnInit = function () {
    };
    ProfileOverviewPage.prototype.navigateHome = function () {
        var tabsNav = this.app.getNavByIdOrName('myNavigation');
        tabsNav.select(0);
        this.app.navPop();
    };
    ProfileOverviewPage.prototype.add = function () {
        var tabsNav = this.app.getNavByIdOrName('myNavigation');
        tabsNav.select(2);
        this.app.navPop();
    };
    ProfileOverviewPage.prototype.addCoHouse = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__add_house_add_house__["a" /* AddHousePage */]);
    };
    ProfileOverviewPage.prototype.logout = function () {
        var _this = this;
        this.afAuth.auth.signOut().catch(function (error) {
            // Handle Errors here.
            console.log("handle errors here");
            _this.presentAlert("Afmelden niet gelukt.", 'Er ging iets mis bij het afmelden, probeer het later opnieuw.');
        });
    };
    ProfileOverviewPage.prototype.alertDelete = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Verwijder account',
            message: 'Als u uw account verwijderd worden ook alle woningen die u heeft toegevoegd verwijderd.',
            buttons: [
                {
                    text: 'Annuleren',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Bevestigen',
                    handler: function () {
                        console.log('Buy clicked');
                        var user = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"]().currentUser;
                        user.delete().then(function () {
                            // User deleted.
                            _this.deleteAccount();
                        }).catch(function (error) {
                            _this.presentAlert('Fout bij verwijderen', 'Oeps, er ging iets mis bij het verwijderen van uw account. Gelieve eerst af te melden en opnieuw aan te melden als dit probleem zich blijft voordoen.');
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    ProfileOverviewPage.prototype.deleteAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db, housesRef, qry, batch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["firestore"]();
                        housesRef = db.collection('houses');
                        return [4 /*yield*/, housesRef.where('email', '==', this.userService.userEmail).get()];
                    case 1:
                        qry = _a.sent();
                        batch = this.afs.firestore.batch();
                        qry.forEach(function (doc) {
                            batch.delete(doc.ref);
                        });
                        batch.commit()
                            .catch(function (err) { return console.log("failed with " + err.message); });
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfileOverviewPage.prototype.myHouses = function (house) {
        console.log("Navigate to next page");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__my_houses_my_houses__["a" /* MyHouses */], {});
    };
    ProfileOverviewPage.prototype.presentAlert = function (titleText, subtitleText) {
        var alert = this.alertCtrl.create({
            title: titleText,
            subTitle: subtitleText,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    ProfileOverviewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile-overview',template:/*ion-inline-start:"/Users/jonastorfs/Documents/Projecten/co-house-pwa/src/pages/profile-overview/profile-overview.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title (click)="navigateHome()">CO-HOUSE</ion-title>\n        <ion-buttons right>\n          <button class="add" (click)="add()">\n            <ion-icon name="add"></ion-icon>\n          </button>\n          <button class="addWebsite" (click)="add()">\n           <h5>ADD NEW HOUSE</h5>\n            </button>\n        </ion-buttons>\n      </ion-navbar>\n</ion-header>\n\n<ion-content padding class="overviewAccounnt" style="background-image:url(\'assets/imgs/background.jpg\');background-repeat: no-repeat;background-size: 100% 100%">\n  <ion-grid>\n    <div>\n    \n        <ion-row>\n            <ion-col col-1></ion-col>\n            <ion-col col-10>\n              <img class="logo" src="assets/imgs/co-house-logo.png">\n            </ion-col>\n            <ion-col col-1></ion-col>\n          </ion-row>\n  \n      <ion-list class="list-form houseButtons" style="margin-bottom: 30px">\n  \n                <button class="socialLogin" ion-button block round color="danger" (click)="addCoHouse()">\n                       Woning toevoegen\n                      </button>\n                <button class="socialLogin" ion-button block round color="danger" (click)="myHouses()">\n                       Mijn woningen\n                      </button>\n      \n      </ion-list>\n  \n      <button class="loginButton" color="primary" ion-button block round (click)="logout()">Afmelden</button>\n      <button class="deleteAccount" ion-button round style="margin-top:20px;height: 35px;font-size: 14px;" block (click)="alertDelete()">Account verwijderen</button>\n  \n    </div>\n  </ion-grid>\n  </ion-content>'/*ion-inline-end:"/Users/jonastorfs/Documents/Projecten/co-house-pwa/src/pages/profile-overview/profile-overview.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__["a" /* AngularFirestore */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_8__shared_service_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], ProfileOverviewPage);
    return ProfileOverviewPage;
}());

//# sourceMappingURL=profile-overview.js.map

/***/ }),

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Garden */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddHousePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__add_house_extra_info_add_house_extra_info__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_service_add_house_service__ = __webpack_require__(197);
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

var AddHousePage = /** @class */ (function () {
    function AddHousePage(navCtrl, afs, alertCtrl, http, addHouseObject, app) {
        this.navCtrl = navCtrl;
        this.afs = afs;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.addHouseObject = addHouseObject;
        this.app = app;
        this.icons = "male_female";
        this.smokers = false;
    }
    AddHousePage.prototype.ngOnInit = function () {
    };
    AddHousePage.prototype.navigateHome = function () {
        var tabsNav = this.app.getNavByIdOrName('myNavigation');
        tabsNav.select(0);
        this.app.navPop();
    };
    AddHousePage.prototype.add = function () {
        var tabsNav = this.app.getNavByIdOrName('myNavigation');
        tabsNav.select(2);
        this.app.navPop();
    };
    AddHousePage.prototype.getPostalCode = function () {
        var _this = this;
        if (this.postalCode.length == 4) {
            this.http.get("https://api.zippopotam.us/be/" + this.postalCode).subscribe(function (data) { _this.data = data; }, function (err) { return console.error(err); }, function () { return _this.cityFromPostalCode = _this.data["places"][0]["place name"]; });
        }
    };
    AddHousePage.prototype.nextPage = function () {
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
            }
            default: {
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
            }
            default: {
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
            }
            default: {
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
        }
        else {
            this.addHouseObject.age_from = this.age_from;
        }
        if (this.age_to == undefined) {
            this.addHouseObject.age_to = 0;
        }
        else {
            this.addHouseObject.age_to = this.age_to;
        }
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__add_house_extra_info_add_house_extra_info__["a" /* AddHouseExtraInfoPage */], {});
    };
    AddHousePage.prototype.presentAlert = function (titleText, subtitleText) {
        var alert = this.alertCtrl.create({
            title: titleText,
            subTitle: subtitleText,
            buttons: ['OK']
        });
        alert.present();
    };
    AddHousePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-add-house',template:/*ion-inline-start:"/Users/jonastorfs/Documents/Projecten/co-house-pwa/src/pages/add-house/add-house.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title (click)="navigateHome()">CO-HOUSE</ion-title>\n        <ion-buttons right>\n            <button class="add" (click)="add()">\n                <ion-icon name="add"></ion-icon>\n            </button>\n            <button class="addWebsite" (click)="add()">\n                <h5>ADD NEW HOUSE</h5>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div class="addHouse">\n        <ion-item>\n            <ion-label>Provincie*</ion-label>\n            <ion-select [(ngModel)]="province" multiple="false">\n                <ion-option value="Antwerpen">Antwerpen</ion-option>\n                <ion-option value="Limburg">Limburg</ion-option>\n                <ion-option value="Oost-Vlaanderen">Oost-Vlaanderen</ion-option>\n                <ion-option value="Vlaams-Brabant">Vlaams-Brabant</ion-option>\n                <ion-option value="West-Vlaanderen">West-Vlaanderen</ion-option>\n                <ion-option value="Henegouwen">Henegouwen</ion-option>\n                <ion-option value="Luik">Luik</ion-option>\n                <ion-option value="Luxemburg">Luxemburg</ion-option>\n                <ion-option value="Namen">Namen</ion-option>\n                <ion-option value="Waals-Brabant">Waals-Brabant</ion-option>\n                <ion-option value="Brussel">Brussel</ion-option>\n            </ion-select>\n        </ion-item>\n\n        <ion-item>\n            <ion-label>Postcode*</ion-label>\n            <ion-input [(ngModel)]="postalCode" (ionChange)="getPostalCode()"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label>Stad</ion-label>\n            <ion-input [disabled]="true" class="cityFromPostalCode" [(ngModel)]="cityFromPostalCode"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label>Straat</ion-label>\n            <ion-input [disabled]="false" class="street" [(ngModel)]="street"></ion-input>\n        </ion-item>\n\n        <ion-segment [(ngModel)]="icons" color="primary" class="segment">\n            <ion-segment-button value="male_only">\n                <ion-icon name="man"></ion-icon>\n            </ion-segment-button>\n            <ion-segment-button value="female_only">\n                <ion-icon name="woman"></ion-icon>\n            </ion-segment-button>\n            <ion-segment-button isActive="true" value="male_female">\n                <ion-icon name="man"></ion-icon>\n                <ion-icon name="woman"></ion-icon>\n                <label></label>\n            </ion-segment-button>\n        </ion-segment>\n\n        <ion-item>\n            <ion-label>Tuin*</ion-label>\n            <ion-select [(ngModel)]="garden" multiple="false">\n                <ion-option value="true">Met tuin</ion-option>\n                <ion-option value="not_true">Zonder tuin</ion-option>\n            </ion-select>\n        </ion-item>\n\n        <ion-item>\n            <ion-label>Huisdieren toegelaten*</ion-label>\n            <ion-select [(ngModel)]="pets_allowed" multiple="false">\n                <ion-option value="true">Toegelaten</ion-option>\n                <ion-option value="not_true">Niet toegelaten</ion-option>\n            </ion-select>\n        </ion-item>\n\n        <ion-item>\n            <ion-label>Kamer bemeubeld*</ion-label>\n            <ion-select [(ngModel)]="room_furnished" multiple="false">\n                <ion-option value="true">Bemeubeld</ion-option>\n                <ion-option value="not_true">Niet bemeumeld</ion-option>\n            </ion-select>\n        </ion-item>\n\n        <ion-item>\n            <ion-label>Rokers toegelaten*</ion-label>\n            <ion-toggle [(ngModel)]="smokers"></ion-toggle>\n        </ion-item>\n\n\n        <ion-item>\n            <ion-label>Leeftijd gezocht*</ion-label>\n            <ion-input [(ngModel)]="age_from" type="number" placeholder="Van"></ion-input>\n            <ion-input [(ngModel)]="age_to" type="number" placeholder="Tot"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label>Prijs per maand*</ion-label>\n            <ion-input [(ngModel)]="max_price" type="number" placeholder="prijs"></ion-input>\n        </ion-item>\n\n        <div text-center class="button-layout">\n            <button ion-button color="primary" class="nextPage" outline round (click)="nextPage()">Volgende </button>\n        </div>\n    </div>\n</ion-content>'/*ion-inline-end:"/Users/jonastorfs/Documents/Projecten/co-house-pwa/src/pages/add-house/add-house.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__["a" /* AngularFirestore */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_5__shared_service_add_house_service__["a" /* AddHouseService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], AddHousePage);
    return AddHousePage;
}());

//# sourceMappingURL=add-house.js.map

/***/ }),

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Images */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddHouseExtraInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_image_picker__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_firestore__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_storage__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_service_add_house_service__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_service_user_service__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_firebase_app__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var Images = /** @class */ (function () {
    function Images() {
    }
    return Images;
}());

var AddHouseExtraInfoPage = /** @class */ (function () {
    function AddHouseExtraInfoPage(navCtrl, afAuth, alertCtrl, navParam, imagePicker, addHouseObject, afs, userService, datePipe, storage, app, http, httpClient) {
        this.navCtrl = navCtrl;
        this.afAuth = afAuth;
        this.alertCtrl = alertCtrl;
        this.navParam = navParam;
        this.imagePicker = imagePicker;
        this.addHouseObject = addHouseObject;
        this.afs = afs;
        this.userService = userService;
        this.datePipe = datePipe;
        this.storage = storage;
        this.app = app;
        this.http = http;
        this.httpClient = httpClient;
        this.filesToUpload = [];
        this.filesAdded = [];
        this.images = [];
        this.newFirebaseArray = [];
        this.price = "9,99";
    }
    AddHouseExtraInfoPage.prototype.ngOnInit = function () {
        console.log("House object " + this.addHouseObject.province);
    };
    AddHouseExtraInfoPage.prototype.navigateHome = function () {
        var tabsNav = this.app.getNavByIdOrName('myNavigation');
        tabsNav.select(0);
        this.app.navPop();
    };
    AddHouseExtraInfoPage.prototype.add = function () {
        var tabsNav = this.app.getNavByIdOrName('myNavigation');
        tabsNav.select(2);
        this.app.navPop();
    };
    AddHouseExtraInfoPage.prototype.checkPaymentWeb = function () {
        //this.http.get('https://us-central1-co-housedev.cloudfunctions.net/pay')  
        this.httpClient.get('https://us-central1-co-housedev.cloudfunctions.net/pay')
            .subscribe(function (res) {
            console.log(res);
        }, function (err) {
            console.log("Error occured: " + err);
        });
    };
    AddHouseExtraInfoPage.prototype.addCouHouse = function () {
        var _this = this;
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
        var coHouse = this.afs.collection('houses');
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
        }).then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            _this.docRef = docRef.id;
            var metadata = {
                contentType: 'image/jpeg',
            };
            _this.addCity();
            _this.docRef = docRef.id;
            var firebaseRef = __WEBPACK_IMPORTED_MODULE_11_firebase_app__["firestore"]().collection('houses').doc(_this.docRef);
            if (_this.imagePaths && _this.imagePaths.length) {
                var _loop_1 = function () {
                    console.log("Adding photo's" + _this.imagePaths[i]);
                    var filePath = 'images/' + docRef.id + '/' + i + '.jpg';
                    var ref = _this.storage.ref(filePath);
                    // const task = ref.put(this.imagePaths[i], metadata).then((snapshot) => {
                    var task = ref.putString(_this.imagePaths[i], 'base64').then(function (snapshot) {
                        // const task = ref.put(imageBlob).then((snapshot) => {
                        console.log('Uploaded an image!');
                        var downloadUrl = ref.getDownloadURL();
                        console.log("downloadURL: " + downloadUrl);
                        downloadUrl.subscribe(function (url) {
                            if (url) {
                                console.log(url);
                                //this.newFirebaseArray.push({downloadUdrl: url});
                                var imageData_1 = { downloadUrl: url };
                                _this.afs.firestore.runTransaction(function (t) {
                                    return t.get(firebaseRef).then(function (doc) {
                                        // doc doesn't exist; can't update
                                        if (!doc.data().images2) {
                                            console.log("if images2 not found");
                                            t.set(firebaseRef, { 'images2': [imageData_1] }, { merge: true });
                                        }
                                        else {
                                            console.log("If images2 found");
                                            //const newImagesArray = doc.get('images2').push( {downloadUrl: url} );
                                            var existingImages = doc.data().images2;
                                            existingImages.push(imageData_1);
                                            t.set(firebaseRef, { images2: existingImages }, { merge: true });
                                        }
                                    });
                                }).then(function () {
                                    console.log("Transaction successfully committed!");
                                }).catch(function (error) {
                                    console.log("Transaction failed: ", error);
                                });
                            }
                        });
                    });
                };
                for (var i = 0; i < _this.imagePaths.length; i++) {
                    _loop_1();
                }
            }
        }).catch(function (error) {
            console.error("Error adding document: ", error);
            _this.presentAlert('Fout bij opslagen', 'Er ging iets mis met het opslagen van uw woning info, gelieve nog eens te proberen.');
        });
        console.log("Outside function loop: " + this.docRef);
    };
    AddHouseExtraInfoPage.prototype.addImages = function () {
        var _this = this;
        var optionsBase64 = {
            maximumImagesCount: 10,
            outputType: 1
        };
        var options = {
            maximumImagesCount: 10,
            outputType: 1
        };
        this.imagePaths = new Array();
        this.imagePathsBase64 = new Array();
        this.imagePicker.getPictures(options).then(function (results) {
            for (var i = 0; i < results.length; i++) {
                var image = results[i];
                _this.imagePaths.push(results[i]);
            }
        }, function (err) { console.log("Coulden't get picture"); });
    };
    AddHouseExtraInfoPage.prototype.verifyDiscount = function () {
        var _this = this;
        if (this.discount_code === undefined || this.discount_code === '') {
            this.discountCodeNotOK = 'Ongeldige kortingscode';
            this.price = '9,99';
            this.discountCodeOK = '';
        }
        else {
            this.itemsCollectionDiscountCode = this.afs.collection('discount_code', function (ref) { return ref.where('code', '==', _this.discount_code.toUpperCase()).where('valid', '==', true); });
            this.itemsCollectionDiscountCode.valueChanges().subscribe(function (discountCode) {
                _this.discountCodes = discountCode;
                console.log(_this.discountCodes);
                if (_this.discountCodes.length > 0) {
                    console.log("In if loop");
                    for (var _i = 0, _a = _this.discountCodes; _i < _a.length; _i++) {
                        var code = _a[_i];
                        console.log("for loop " + code.code);
                        _this.discountCodeOK = 'Geldige kortingscode';
                        _this.discountCodeNotOK = '';
                        _this.price = "0,00";
                    }
                }
                else {
                    console.log("No discount code found");
                    _this.discountCodeNotOK = 'Ongeldige kortingscode';
                    _this.price = '9,99';
                    _this.discountCodeOK = '';
                }
            });
        }
    };
    AddHouseExtraInfoPage.prototype.fileChangeEvent = function (fileInput) {
        this.filesToUpload = fileInput.target.files;
    };
    AddHouseExtraInfoPage.prototype.addCouHouseWeb = function () {
        var _this = this;
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
        var coHouse = this.afs.collection('houses');
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
        }).then(function (docRef) {
            _this.addCity();
            _this.docRef = docRef.id;
            var firebaseRef = __WEBPACK_IMPORTED_MODULE_11_firebase_app__["firestore"]().collection('houses').doc(_this.docRef);
            if (_this.filesToUpload && _this.filesToUpload.length) {
                var _loop_2 = function () {
                    var filePath = 'images/' + docRef.id + '/' + i + '.jpg';
                    var ref = _this.storage.ref(filePath);
                    var task = ref.put(_this.filesToUpload[i]).then(function (snapshot) {
                        var downloadUrl = ref.getDownloadURL();
                        downloadUrl.subscribe(function (url) {
                            if (url) {
                                var imageData_2 = { downloadUrl: url };
                                _this.afs.firestore.runTransaction(function (t) {
                                    return t.get(firebaseRef).then(function (doc) {
                                        // doc doesn't exist; can't update
                                        if (!doc.data().images2) {
                                            console.log("if images2 not found");
                                            t.set(firebaseRef, { 'images2': [imageData_2] }, { merge: true });
                                        }
                                        else {
                                            console.log("If images2 found");
                                            //const newImagesArray = doc.get('images2').push( {downloadUrl: url} );
                                            var existingImages = doc.data().images2;
                                            existingImages.push(imageData_2);
                                            t.set(firebaseRef, { images2: existingImages }, { merge: true });
                                        }
                                    });
                                }).then(function () {
                                    console.log("Transaction successfully committed!");
                                }).catch(function (error) {
                                    console.log("Transaction failed: ", error);
                                });
                            }
                        });
                    });
                };
                for (var i = 0; i < _this.filesToUpload.length; i++) {
                    _loop_2();
                }
            }
        }).catch(function (error) {
            console.error("Error adding document: ", error);
            _this.presentAlert('Fout bij opslagen', 'Er ging iets mis met het opslagen van uw woning info, gelieve nog eens te proberen.');
        });
        console.log("Outside function loop: " + this.docRef);
    };
    AddHouseExtraInfoPage.prototype.addCity = function () {
        var _this = this;
        this.itemsCollectionCity = this.afs.collection('cities', function (ref) { return ref.where('name_nl', '==', _this.addHouseObject.cityFromPostalCode); });
        this.itemsCollectionCity.valueChanges().subscribe(function (city) {
            _this.cities = city;
            if (_this.cities.length > 0) {
                console.log("In if loop");
                for (var _i = 0, _a = _this.cities; _i < _a.length; _i++) {
                    var city_1 = _a[_i];
                    console.log("for loop " + city_1.name_nl);
                    console.log("city exists");
                }
            }
            else {
                var city_2 = _this.afs.collection('cities');
                city_2.add({
                    country: "BE",
                    name_nl: _this.addHouseObject.cityFromPostalCode
                });
            }
        });
    };
    AddHouseExtraInfoPage.prototype.presentAlert = function (titleText, subtitleText) {
        var alert = this.alertCtrl.create({
            title: titleText,
            subTitle: subtitleText,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    AddHouseExtraInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-add-house-extra-info',template:/*ion-inline-start:"/Users/jonastorfs/Documents/Projecten/co-house-pwa/src/pages/add-house-extra-info/add-house-extra-info.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title (click)="navigateHome()">CO-HOUSE</ion-title>\n        <ion-buttons right>\n            <button class="add" (click)="add()">\n                <ion-icon name="add"></ion-icon>\n            </button>\n            <button class="addWebsite" (click)="add()">\n                <h5>ADD NEW HOUSE</h5>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div class="addHouse">\n        <ion-slides class="imageSlider" pager>\n            <ion-slide [(ngModel)]="imagePaths" *ngFor="let imagePath of imagePaths">\n                <img class="img_card" src="data:image/jpg;base64,{{imagePath}}" />\n            </ion-slide>\n            <ion-slide (click)="addImages()">\n                <ion-icon name="add"></ion-icon>\n                <p>Voeg foto\'s toe van uw woning</p>\n            </ion-slide>\n        </ion-slides>\n\n        <div class="dropzone" \n     dropZone\n     (hovered)="toggleHover($event)"\n     (dropped)="startUpload($event)"\n     [class.hovering]="isHovering">\n\n     <h3>Voeg afbeeldingen toe van uw woning</h3>\n\n     <div class="file">\n        <label class="file-label">\n        <input class="file-input" multiple type="file" placeholder=" "(change)="fileChangeEvent($event)">\n        </label>\n      </div>\n</div>\n\n        <ion-label class="labelName">Geeft een korte titel voor de woning*</ion-label>\n        <ion-textarea maxLength=70 rows="2" class="nameDescription" [(ngModel)]="nameDescription" placeholder="Kamer te huur in gerenoveerd herenhuis. (max 70 karakters)"></ion-textarea>\n\n        <ion-label class="labelDescription">Geeft hier een beschrijving van de woning*</ion-label>\n        <ion-textarea rows="5" class="houseDescription" [(ngModel)]="houseDescription" placeholder="Geef een beschrijving van de woning"></ion-textarea>\n\n        <ion-label class="labelDescriptionResidents">Geeft hier een beschrijving van de inwoners</ion-label>\n        <ion-textarea rows="5" class="residentsDescription" [(ngModel)]="residentsDescription" placeholder="Geef een korte beschrijving van de huidige inwoners"></ion-textarea>\n\n        <ion-item>\n            <ion-label class="number_of_residentsLabel">Aantal inwoners:</ion-label>\n            <ion-input [(ngModel)]="number_of_residents" type="number" placeholder="Aantal inwoners"></ion-input>\n        </ion-item>\n\n\n        <ion-input text-center class="discountCodeInput" [(ngModel)]="discount_code"  (ngModelChange)="discount_code = $event.toLocaleUpperCase()"\n            size="30" maxlength="30" placeholder="Kortingsscode ingeven"></ion-input>\n        <ion-label text-center (click)="verifyDiscount()" class="discountCodeLabel">Code controleren</ion-label>\n        <ion-label placeholder=\'\' name=\'Discount not ok\' text-center class="discountCodeNotOK">{{discountCodeNotOK}}</ion-label>\n        <ion-label placeholder=\'\' name=\'Discount code ok \' text-center class="discountCodeOK">{{discountCodeOK}}</ion-label>\n\n        <div text-center class="button-layout">\n            <button ion-button color="primary" class="addHouseButton" outline round (click)="addCouHouse()">Bevestigen</button>\n        </div>\n\n        <div text-center class="button-layout">\n            <button ion-button color="primary" class="addHouseButtonWeb" outline round  (click)="addCouHouseWeb()">Bevestigen</button>\n        </div>\n\n        <ion-label text-wrap placeholder=\'\' name=\'Price for adding new house\' text-center class="priceLabel">Een nieuwe woning toevoegen kost {{price}} € en uw woning zal 3 maanden beschikbaar zijn.</ion-label>\n    </div>\n</ion-content>'/*ion-inline-end:"/Users/jonastorfs/Documents/Projecten/co-house-pwa/src/pages/add-house-extra-info/add-house-extra-info.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_image_picker__["a" /* ImagePicker */], __WEBPACK_IMPORTED_MODULE_9__shared_service_add_house_service__["a" /* AddHouseService */], __WEBPACK_IMPORTED_MODULE_7_angularfire2_firestore__["a" /* AngularFirestore */], __WEBPACK_IMPORTED_MODULE_10__shared_service_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["d" /* DatePipe */], __WEBPACK_IMPORTED_MODULE_8_angularfire2_storage__["a" /* AngularFireStorage */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]])
    ], AddHouseExtraInfoPage);
    return AddHouseExtraInfoPage;
}());

//# sourceMappingURL=add-house-extra-info.js.map

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyHouses; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__houseDetail_houseDetail__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_service_user_service__ = __webpack_require__(85);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyHouses = /** @class */ (function () {
    function MyHouses(navCtrl, afs, afAuth, app, userService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.afs = afs;
        this.afAuth = afAuth;
        this.app = app;
        this.userService = userService;
        this.itemsCollectionHouse = afs.collection('houses', function (ref) { return ref.where('email', '==', _this.userService.userEmail); });
        this.houses = this.itemsCollectionHouse.snapshotChanges().map(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                data.id = a.payload.doc.id;
                return data;
            });
        });
    }
    MyHouses.prototype.navigateHome = function () {
        var tabsNav = this.app.getNavByIdOrName('myNavigation');
        tabsNav.select(0);
        this.app.navPop();
    };
    MyHouses.prototype.navigateToHouseDetail = function (house) {
        console.log("Navigate to next page");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__houseDetail_houseDetail__["a" /* HouseDetailPage */], {
            'homeId': house.id,
        });
    };
    MyHouses.prototype.add = function () {
        var tabsNav = this.app.getNavByIdOrName('myNavigation');
        tabsNav.select(2);
        this.app.navPop();
    };
    MyHouses = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'my-houses',template:/*ion-inline-start:"/Users/jonastorfs/Documents/Projecten/co-house-pwa/src/pages/my-houses/my-houses.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title (click)="navigateHome()">CO-HOUSE</ion-title>\n        <ion-buttons right>\n            <button class="add" (click)="add()">\n                <ion-icon name="add"></ion-icon>\n            </button>\n            <button class="addWebsite" (click)="add()">\n                <h5>ADD NEW HOUSE</h5>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-grid fixed>\n        <ion-row>\n            <ion-card ion-col col-6 col-md-4 col-lg-3 *ngFor="let house of houses | async" class="homeCard" (click)="navigateToHouseDetail(house)">\n                <ion-slides class="imageSliderHouse" pager>\n                    <ion-slide *ngFor="let image of house.images2">\n                        <img class="img_card" [src]="image.downloadUrl" />\n                    </ion-slide>\n                </ion-slides>\n\n                <ion-card-content>\n                    <ion-card-title text-wrap class="houseName">\n                        {{house.name}}\n                    </ion-card-title>\n                    <p text-wrap class="price">\n                        € {{house.price_month}} per maand\n                    </p>\n                </ion-card-content>\n            </ion-card>\n        </ion-row>\n    </ion-grid>\n</ion-content>'/*ion-inline-end:"/Users/jonastorfs/Documents/Projecten/co-house-pwa/src/pages/my-houses/my-houses.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__["a" /* AngularFirestore */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_5__shared_service_user_service__["a" /* UserService */]])
    ], MyHouses);
    return MyHouses;
}());

//# sourceMappingURL=my-houses.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__houseDetail_houseDetail__ = __webpack_require__(198);
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
    function HomePage(navCtrl, afs, afAuth, app, datePipe) {
        this.navCtrl = navCtrl;
        this.afs = afs;
        this.afAuth = afAuth;
        this.app = app;
        this.datePipe = datePipe;
        this.itemsCollectionProvince = afs.collection('provinces', function (ref) { return ref.where('country', '==', 'BE').orderBy('name_nl'); });
        this.provinces = this.itemsCollectionProvince.valueChanges();
        this.current_date = new Date();
        var currentDateFormatted = this.datePipe.transform(this.current_date, 'yyyy-MM-dd');
        this.itemsCollectionHouse = afs.collection('houses', function (ref) { return ref.where('valid_until', '>', currentDateFormatted); });
        this.houses = this.itemsCollectionHouse.snapshotChanges().map(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                data.id = a.payload.doc.id;
                return data;
            });
        });
    }
    HomePage.prototype.navigateHome = function () {
        var tabsNav = this.app.getNavByIdOrName('myNavigation');
        tabsNav.select(0);
        this.app.navPop();
    };
    HomePage.prototype.navigateToHouseDetail = function (house) {
        console.log("Navigate to next page");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__houseDetail_houseDetail__["a" /* HouseDetailPage */], {
            'homeId': house.id,
        });
    };
    HomePage.prototype.add = function () {
        var tabsNav = this.app.getNavByIdOrName('myNavigation');
        tabsNav.select(2);
        this.app.navPop();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'home',template:/*ion-inline-start:"/Users/jonastorfs/Documents/Projecten/co-house-pwa/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title (click)="navigateHome()">CO-HOUSE</ion-title>\n    <ion-buttons right>\n      <button class="add" (click)="add()">\n        <ion-icon name="add"></ion-icon>\n      </button>\n      <button class="addWebsite" (click)="add()">\n       <h5>ADD NEW HOUSE</h5>\n        </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-grid fixed>\n    <ul>\n      <li *ngFor="let province of provinces | async">\n        <h3 text-wrap> Woningen in {{ province.name_nl }} </h3>\n        <ion-scroll scrollX="true">\n          <div class="house" *ngFor="let house of houses | async">\n            <ion-card class="homeCard" (click)="navigateToHouseDetail(house)" *ngIf="province.name_nl ==  house.province">\n             <ion-slides class="imageSliderHouse" pager>\n                <ion-slide *ngFor="let image of house.images2">\n                    <img  class="img_card" [src]="image.downloadUrl" />\n                </ion-slide>\n              </ion-slides>\n\n              <ion-card-content>\n                <ion-card-title text-wrap class="houseName">\n                  {{house.name}}\n                </ion-card-title>\n                <p text-wrap class="price">\n                  € {{house.price_month}} per maand\n                </p>\n              </ion-card-content>\n            </ion-card>\n          </div>\n        </ion-scroll>\n      </li>\n    </ul>\n  </ion-grid>\n</ion-content>'/*ion-inline-end:"/Users/jonastorfs/Documents/Projecten/co-house-pwa/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__["a" /* AngularFirestore */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_2__angular_common__["d" /* DatePipe */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(356);

//import 'web-animations-js/web-animations.min';

Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_search_search__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_profile_profile__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_home_home__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_houseDetail_houseDetail__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_register_register__ = __webpack_require__(594);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_add_house_add_house__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_add_house_extra_info_add_house_extra_info__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_test_test__ = __webpack_require__(595);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_profile_overview_profile_overview__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_my_houses_my_houses__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_directives_file_upload__ = __webpack_require__(596);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_shared_service_search_house__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_status_bar__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_splash_screen__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__angular_common__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_image_picker__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_shared_service_add_house_service__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_shared_service_user_service__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_angularfire2__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__environments_environment__ = __webpack_require__(597);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_angularfire2_firestore__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_angularfire2_storage__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30_angularfire2_auth__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_payment_payment__ = __webpack_require__(598);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
























//shared services


//Add all firebase and AngularFire relations here






var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_houseDetail_houseDetail__["a" /* HouseDetailPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_add_house_add_house__["a" /* AddHousePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_add_house_extra_info_add_house_extra_info__["a" /* AddHouseExtraInfoPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_profile_overview_profile_overview__["a" /* ProfileOverviewPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_my_houses_my_houses__["a" /* MyHouses */],
                __WEBPACK_IMPORTED_MODULE_18__pages_directives_file_upload__["a" /* DropZoneDirective */],
                __WEBPACK_IMPORTED_MODULE_15__pages_test_test__["a" /* TestPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */]),
                __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_11__pages_houseDetail_houseDetail__["a" /* HouseDetailPage */]),
                __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */]),
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { component: __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */], name: 'TabsPage', segment: '' },
                        { component: __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */], name: 'home', segment: '' },
                        { component: __WEBPACK_IMPORTED_MODULE_11__pages_houseDetail_houseDetail__["a" /* HouseDetailPage */], name: 'detail-page', segment: 'detail/:homeId', defaultHistory: [__WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */]] },
                        { component: __WEBPACK_IMPORTED_MODULE_7__pages_search_search__["a" /* SearchPage */], name: 'search', segment: 'search' },
                        { component: __WEBPACK_IMPORTED_MODULE_8__pages_profile_profile__["a" /* ProfilePage */], name: 'profile', segment: 'profile' },
                        { component: __WEBPACK_IMPORTED_MODULE_16__pages_profile_overview_profile_overview__["a" /* ProfileOverviewPage */], name: 'profile-overview', segment: 'profile-overview', defaultHistory: [__WEBPACK_IMPORTED_MODULE_8__pages_profile_profile__["a" /* ProfilePage */]] },
                        { component: __WEBPACK_IMPORTED_MODULE_13__pages_add_house_add_house__["a" /* AddHousePage */], name: 'add-house', segment: 'add-house' },
                        { component: __WEBPACK_IMPORTED_MODULE_11__pages_houseDetail_houseDetail__["a" /* HouseDetailPage */], name: 'add-house-detial', segment: 'add-house-detail', defaultHistory: [__WEBPACK_IMPORTED_MODULE_13__pages_add_house_add_house__["a" /* AddHousePage */]] },
                        { component: __WEBPACK_IMPORTED_MODULE_17__pages_my_houses_my_houses__["a" /* MyHouses */], name: 'my-houses', segment: 'my-houses' },
                        { component: __WEBPACK_IMPORTED_MODULE_31__pages_payment_payment__["a" /* PaymentPage */], name: 'payment', segment: 'payment' },
                        { component: __WEBPACK_IMPORTED_MODULE_12__pages_register_register__["a" /* RegisterPage */], name: 'register', segment: 'register' }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_26_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_27__environments_environment__["a" /* environmentDEV */].firebase),
                __WEBPACK_IMPORTED_MODULE_28_angularfire2_firestore__["b" /* AngularFirestoreModule */],
                __WEBPACK_IMPORTED_MODULE_30_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_29_angularfire2_storage__["b" /* AngularFireStorageModule */] // imports firebase/storage only needed for storage features
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_houseDetail_houseDetail__["a" /* HouseDetailPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_add_house_add_house__["a" /* AddHousePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_add_house_extra_info_add_house_extra_info__["a" /* AddHouseExtraInfoPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_profile_overview_profile_overview__["a" /* ProfileOverviewPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_my_houses_my_houses__["a" /* MyHouses */],
                __WEBPACK_IMPORTED_MODULE_15__pages_test_test__["a" /* TestPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_28_angularfire2_firestore__["a" /* AngularFirestore */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["d" /* IonicErrorHandler */] },
                /* Line below is used to remove the # from the url, but this currently gives error: CANNOT GET when refreshing page.
                  Check again when hoting the app: https://forum.ionicframework.com/t/tutorial-removing-from-ionic-pwa/103950
                {provide: LocationStrategy, useClass: PathLocationStrategy},*/
                __WEBPACK_IMPORTED_MODULE_23__ionic_native_image_picker__["a" /* ImagePicker */],
                __WEBPACK_IMPORTED_MODULE_24__pages_shared_service_add_house_service__["a" /* AddHouseService */],
                __WEBPACK_IMPORTED_MODULE_25__pages_shared_service_user_service__["a" /* UserService */],
                __WEBPACK_IMPORTED_MODULE_22__angular_common__["d" /* DatePipe */],
                __WEBPACK_IMPORTED_MODULE_19__pages_shared_service_search_house__["a" /* SearchHouseService */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 397:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(298);
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
        this.tabsPlacement = 'bottom';
        this.tabsLayout = 'icon-top';
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        if (!platform.is('mobile')) {
            this.tabsPlacement = 'top';
            this.tabsLayout = 'icon-left';
        }
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/jonastorfs/Documents/Projecten/co-house-pwa/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/jonastorfs/Documents/Projecten/co-house-pwa/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 594:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__profile_profile__ = __webpack_require__(107);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegisterPage = /** @class */ (function () {
    function RegisterPage(navCtrl, afAuth, alertCtrl) {
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
    RegisterPage.prototype.ngOnInit = function () {
    };
    RegisterPage.prototype.login = function () {
        console.log("Navigate to next page");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__profile_profile__["a" /* ProfilePage */], {});
    };
    RegisterPage.prototype.signUp = function () {
        var _this = this;
        console.log("username register " + this.username);
        if (this.username == '' || this.password == '' || this.username === undefined || this.password === undefined) {
            this.presentAlert("Registreren", "Gelieve uw emailadres in te vullen en een wachtwoord te kiezen om u te registreren.");
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
            console.log("register after signup show " + this.showLogin);
        }
    };
    RegisterPage.prototype.loginUserWithGoogle = function () {
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
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
            });
        }
    };
    RegisterPage.prototype.loginUserWitFacebook = function () {
        if (!window.cordova) {
            return this.afAuth.auth.signInWithPopup(new __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"].FacebookAuthProvider());
        }
        else {
            __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().signInWithRedirect(new __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"].FacebookAuthProvider).then(function () {
                return __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().getRedirectResult();
            }).then(function (result) {
                // This gives you a Google Access Token.
                // You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
            });
        }
    };
    RegisterPage.prototype.logout = function () {
        var _this = this;
        this.afAuth.auth.signOut().catch(function (error) {
            // Handle Errors here.
            console.log("handle errors here");
            _this.presentAlert("Afmelden niet gelukt.", 'Er ging iets mis bij het afmelden, probeer het later opnieuw.');
        });
    };
    RegisterPage.prototype.presentAlert = function (titleText, subtitleText) {
        var alert = this.alertCtrl.create({
            title: titleText,
            subTitle: subtitleText,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"/Users/jonastorfs/Documents/Projecten/co-house-pwa/src/pages/register/register.html"*/'<ion-content padding class="login" style="background-image:url(\'../../assets/imgs/background.jpg\');background-repeat: no-repeat;background-size: 100% 100%">\n\n    <div>\n      <ion-grid>\n        <ion-row>\n          <ion-col col-2></ion-col>\n          <ion-col col-10 style="margin-left: auto;margin-right: auto;display: block;">\n            <img class="logo" src="../../assets/imgs/co-house-logo.png">\n          </ion-col>\n          <ion-col col-2></ion-col>\n        </ion-row>\n      </ion-grid>\n  \n      <ion-list class="list-form" style="margin-bottom: 30px">\n  \n        <ion-item style="padding:0px !important; border-bottom:none !important;border-top:none;font-size: 14px;margin-top:10px;background:none;border-bottom:1px solid white;box-shadow:none;">\n          <ion-input [(ngModel)]="username" style="color: #9C9495 ;border-bottom-color: #9C9495 ;box-shadow:none;" type="email" placeholder="E-mail"></ion-input>\n        </ion-item>\n        <ion-item style="padding:0px !important; font-size: 14px;margin-top:10px;background:none;border-bottom:1px solid  #9C9495 ;box-shadow:none;">\n          <ion-input [(ngModel)]="password" style="color: #9C9495 ;border-bottom-color: #9C9495  #9C9495 ;box-shadow:none;" type="password"\n            placeholder="Password"></ion-input>\n        </ion-item>\n  \n      </ion-list>\n  \n      <button class="loginButton" color="primary" ion-button block round (click)="login()">Login</button>\n      <button ion-button round style="margin-top:20px;height: 35px;font-size: 14px;" block (click)="signUp()">Registreren</button>\n  \n      <button class="socialLogin" ion-button block round color="danger" (click)="loginUserWithGoogle()">\n          <ion-icon name="logo-googleplus"></ion-icon>\n          Login with Google\n        </button>\n  \n        <button ion-button block round color="facebook" (click)="loginUserWitFacebook()">\n          <ion-icon name="logo-facebook"></ion-icon>\n          Login with Facebook\n        </button>\n      \n    </div>\n\n    </ion-content>\n'/*ion-inline-end:"/Users/jonastorfs/Documents/Projecten/co-house-pwa/src/pages/register/register.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 595:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_image_picker__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TestPage = /** @class */ (function () {
    function TestPage(navCtrl, afAuth, alertCtrl, navParam, imagePicker) {
        this.navCtrl = navCtrl;
        this.afAuth = afAuth;
        this.alertCtrl = alertCtrl;
        this.navParam = navParam;
        this.imagePicker = imagePicker;
        console.log("Welcome on the test page");
        this.imagePaths = navParam.get('imagePaths');
        //this.imageTests = navParam.get('imageTest');
    }
    TestPage.prototype.ngOnInit = function () {
    };
    TestPage.prototype.presentAlert = function (titleText, subtitleText) {
        var alert = this.alertCtrl.create({
            title: titleText,
            subTitle: subtitleText,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    TestPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-test',template:/*ion-inline-start:"/Users/jonastorfs/Documents/Projecten/co-house-pwa/src/pages/test/test.html"*/'<ion-header>\n        <ion-navbar>\n            <ion-title>\n                 toevoegen\n            </ion-title>\n        </ion-navbar>\n    </ion-header>\n    \n    <ion-content padding>\n    \n      \n            <ion-slides class="imageSlider"  pager>\n                <ion-slide [(ngModel)]="imagePaths" *ngFor="let imagePath of imagePaths | async">\n                        <img class="img_card" src="{{imagePath}}" />\n                </ion-slide>\n                    <ion-slide (click)="addImages()">\n                            <ion-icon (click)="addImages()" name="add"></ion-icon>\n                            <p (click)="addImages()">Voeg foto\'s toe van uw woning</p>\n                        </ion-slide>\n            </ion-slides>\n\n            <p>TEST </p>\n            <ion-slides class="imageSlider"  pager>\n                    <ion-slide [(ngModel)]="imageTests" *ngFor="let imageTest of imageTests | async">\n                            <img class="img_card" src="{{imageTests}}" />\n                    </ion-slide>\n                        <ion-slide (click)="addImages()">\n                                <ion-icon (click)="addImages()" name="add"></ion-icon>\n                                <p (click)="addImages()">Voeg foto\'s toe van uw woning</p>\n                            </ion-slide>\n                </ion-slides>\n    </ion-content>'/*ion-inline-end:"/Users/jonastorfs/Documents/Projecten/co-house-pwa/src/pages/test/test.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_image_picker__["a" /* ImagePicker */]])
    ], TestPage);
    return TestPage;
}());

//# sourceMappingURL=test.js.map

/***/ }),

/***/ 596:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DropZoneDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DropZoneDirective = /** @class */ (function () {
    function DropZoneDirective() {
        this.dropped = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.hovered = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
    }
    DropZoneDirective.prototype.onDrop = function ($event) {
        $event.preventDefault();
        this.dropped.emit($event.dataTransfer.files);
        this.hovered.emit(false);
    };
    DropZoneDirective.prototype.onDragOver = function ($event) {
        $event.preventDefault();
        this.hovered.emit(true);
    };
    DropZoneDirective.prototype.onDragLeave = function ($event) {
        $event.preventDefault();
        this.hovered.emit(false);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", Object)
    ], DropZoneDirective.prototype, "dropped", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", Object)
    ], DropZoneDirective.prototype, "hovered", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* HostListener */])('drop', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DropZoneDirective.prototype, "onDrop", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* HostListener */])('dragover', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DropZoneDirective.prototype, "onDragOver", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* HostListener */])('dragleave', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DropZoneDirective.prototype, "onDragLeave", null);
    DropZoneDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: '[dropZone]'
        }),
        __metadata("design:paramtypes", [])
    ], DropZoneDirective);
    return DropZoneDirective;
}());

//# sourceMappingURL=file-upload.js.map

/***/ }),

/***/ 597:
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

/***/ }),

/***/ 598:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PaymentPage = /** @class */ (function () {
    function PaymentPage(navCtrl, afAuth, alertCtrl, navParam) {
        this.navCtrl = navCtrl;
        this.afAuth = afAuth;
        this.alertCtrl = alertCtrl;
        this.navParam = navParam;
    }
    PaymentPage.prototype.ngOnInit = function () {
    };
    PaymentPage.prototype.presentAlert = function (titleText, subtitleText) {
        var alert = this.alertCtrl.create({
            title: titleText,
            subTitle: subtitleText,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    PaymentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-payment',template:/*ion-inline-start:"/Users/jonastorfs/Documents/Projecten/co-house-pwa/src/pages/payment/payment.html"*/'<ion-header>\n    <ion-navbar>\n      <ion-title>Betaling</ion-title>\n      <ion-buttons right>\n        <button class="add" (click)="add()">\n          <ion-icon name="add"></ion-icon>\n        </button>\n      </ion-buttons>\n    </ion-navbar>\n  </ion-header>\n  \n  <ion-content padding>\n    <ul>\n      <li *ngFor="let province of provinces | async">\n        <h3 text-wrap> Woningen in {{ province.name_nl }} </h3>\n        <ion-scroll scrollX="true">\n          <div class="house" *ngFor="let house of houses | async">\n            <ion-card class="homeCard" (click)="navigateToHouseDetail(house)" *ngIf="province.name_nl ==  house.province">\n              <img [src]="imagePath" />\n              <ion-card-content>\n                <ion-card-title text-wrap class="houseName">\n                  {{house.name}}\n                </ion-card-title>\n                <p text-wrap class="price">\n                  € {{house.price_month}} per maand\n                </p>\n              </ion-card-content>\n            </ion-card>\n          </div>\n        </ion-scroll>\n      </li>\n    </ul>\n  \n  \n  </ion-content>'/*ion-inline-end:"/Users/jonastorfs/Documents/Projecten/co-house-pwa/src/pages/payment/payment.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], PaymentPage);
    return PaymentPage;
}());

//# sourceMappingURL=payment.js.map

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], UserService);
    return UserService;
}());

//# sourceMappingURL=user.service.js.map

/***/ })

},[349]);
//# sourceMappingURL=main.js.map