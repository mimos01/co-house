import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, App, Tabs, IonicPage } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { ProfileOverviewPage } from '../profile-overview/profile-overview';
import { UserService } from '../shared-service/user.service';

@IonicPage({
  segment: 'profile'
})

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit {
  username: string;
  password: string;

  usernameRegister: string;
  passwordRegister: string;

  showLogin: boolean;

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public alertCtrl: AlertController, public userService: UserService,
    private app: App) {
    this.afAuth.auth.onAuthStateChanged(
      (user) => {
        if (user) {
          this.userService.userEmail = user.email;
          this.userService.uid = user.uid;
          this.showLogin = false;
          this.navCtrl.setRoot(ProfileOverviewPage, {
            user: user
          });
        } else {
          this.showLogin = true;
          console.log("showLogin user is true " + this.showLogin);
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


  login() {
    if (this.username == '' || this.password == '' || this.username === undefined || this.password === undefined) {
      this.presentAlert("Inloggen", "Uw e-mailadres en wachtwoord moeten ingevuld zijn om te kunnen aanmelden.")
    } else {
      this.afAuth.auth.signInWithEmailAndPassword(this.username, this.password).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-email') {
          this.presentAlert('Inloggen mislukt', 'Het ingegeven email of wachtwoord is foutief, gelieve opnieuw te proberen.');
        } else if (errorCode === 'auth/user-disabled' || errorCode === 'auth/user-not-found') {
          this.presentAlert('Account niet gevonden', 'Uw account werd niet gevonden, gelieve support te contacteren als u denkt dat dit een fout is.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
      console.log("register show " + this.showLogin);
    }
  }

  signUp() {
    console.log("username register " + this.username);
    if (this.username == '' || this.password == '' || this.username === undefined || this.password === undefined) {
      this.presentAlert("Registreren", "Gelieve uw emailadres in te vullen en een wachtwoord te kiezen om u te registreren.")
    } else {
      this.afAuth.auth.createUserWithEmailAndPassword(this.username, this.password).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/email-already-in-use') {
          this.presentAlert('Ongeldig e-mailadres ', 'Het ingegeven e-mailadres bestaat al. Druk op forgot password als u uw wachtwoord vergeten bent.');
        } else if (errorCode === 'auth/invalid-email') {
          this.presentAlert('E-mailadres niet geldig', 'Het ingegeven e-mailadres is niet geldig.');
        } else if (errorCode === 'auth/weak-password') {
          this.presentAlert('Wachtwoord niet geldig', 'Het ingegeven wachtwoord is niet sterk genoeg, probeer cijfers en letters te combineren in uw wachtwoord.');
        } else {
          this.presentAlert('Ongekende fout ', errorMessage);
        }
        console.log(error);
      });

      this.afAuth.auth.onAuthStateChanged(
        (user) => {
          if (user) {
            this.showLogin = false;
            this.navCtrl.setRoot(ProfileOverviewPage, {
              user: user
            });
          } else {
            this.showLogin = true;
            console.log("showLogin user is true " + this.showLogin);
          }
        });
      console.log("register after signup show " + this.showLogin);
    }
  }

  loginUserWithGoogle() {
    if (!(<any>window).cordova) {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } else {
      firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider).then(function () {
        return firebase.auth().getRedirectResult();
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
  }

  loginUserWitFacebook() {
    if (!(<any>window).cordova) {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    } else {
      firebase.auth().signInWithRedirect(new firebase.auth.FacebookAuthProvider).then(function () {
        return firebase.auth().getRedirectResult();
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
  }

  logout() {
    this.afAuth.auth.signOut().catch((error) => {
      // Handle Errors here.
      console.log("handle errors here");
      this.presentAlert("Afmelden niet gelukt.", 'Er ging iets mis bij het afmelden, probeer het later opnieuw.');
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
