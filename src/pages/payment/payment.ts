import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, IonicPage } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage({
  segment: 'payment'
})

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})

export class PaymentPage implements OnInit {

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public alertCtrl: AlertController, public navParam: NavParams) { 
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
