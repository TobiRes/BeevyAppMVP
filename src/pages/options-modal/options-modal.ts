import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-options-modal',
  templateUrl: 'options-modal.html',
})
export class OptionsModalPage {

  userIsEventAdmin: boolean;
  userIsEventMember: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userIsEventAdmin = this.navParams.get("userIsEventAdmin");
    this.userIsEventAdmin = this.navParams.get("userIsEventMember");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsModalPage');
  }

}
