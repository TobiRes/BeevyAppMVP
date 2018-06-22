import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Clipboard} from "@ionic-native/clipboard";



@IonicPage()
@Component({
  selector: 'page-options-modal',
  templateUrl: 'options-modal.html',
})
export class OptionsModalPage {

  userIsEventAdmin: boolean;
  userIsEventMember: boolean;
  eventID: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private clipboard: Clipboard) {
    this.userIsEventAdmin = this.navParams.get("userIsEventAdmin");
    this.userIsEventAdmin = this.navParams.get("userIsEventMember");
    this.eventID = this.navParams.get("eventID");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsModalPage');
  }

  deleteEvent(){

  }
  leaveEvent(){

  }
  eventMelden(){

  }

  idKopieren(){
    this.clipboard.copy(this.eventID);
  }

}
