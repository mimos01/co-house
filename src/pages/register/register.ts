import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { ProfilePage } from '../profile/profile';

@IonicPage({
  segment: 'register'
})

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage implements OnInit {
  username: string;
  password: string;

  usernameRegister: string;
  passwordRegister: string;

  showLogin: boolean;

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public alertCtrl: AlertController) {
    this.afAuth.auth.onAuthStateChanged(
      (user) => {
        if (user) {
          this.showLogin = false;
          console.log("showLogin user is false " + this.showLogin);
        } else {
          this.showLogin = true;
          console.log("showLogin user is true " + this.showLogin);
        }
      });

  }

  ngOnInit() {
  }

  login() {
    console.log("Navigate to next page");
    this.navCtrl.push(ProfilePage, {
    });
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
