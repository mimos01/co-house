import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, Alert, ShowWhen } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { enableLogging } from '@firebase/database-types';

@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})




export class TestPage implements OnInit {
  imagePaths: Array<string>;	
  imageTests


  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public alertCtrl: AlertController, public navParam: NavParams, public imagePicker: ImagePicker) {
    console.log("Welcome on the test page");
    this.imagePaths = navParam.get('imagePaths');
    //this.imageTests = navParam.get('imageTest');
  }

  ngOnInit() {

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
