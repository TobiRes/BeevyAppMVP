import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Clipboard} from "@ionic-native/clipboard";
import {BeevyEventService} from "../../services/event.service";
import {User} from "../../models/user.model";



@IonicPage()
@Component({
  selector: 'page-options-modal',
  templateUrl: 'options-modal.html',
})
export class OptionsModalPage {

  userIsEventAdmin: boolean;
  userIsEventMember: boolean;
  eventID: string;
  user: User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private clipboard: Clipboard,
              private eventService: BeevyEventService,
              private viewCtrl: ViewController) {
    this.userIsEventAdmin = this.navParams.get("userIsEventAdmin");
    this.userIsEventMember = this.navParams.get("userIsEventMember");
    this.user = this.navParams.get("user");
    this.eventID = this.navParams.get("eventID");
  }

  ionViewDidLoad() {
    console.log(this.userIsEventAdmin);
    console.log(this.userIsEventMember);
  }

  deleteEvent(){
    this.eventService.deleteBeevyEvent(this.eventID, this.user);
    this.viewCtrl.dismiss();
  }
  leaveEvent(){
    this.eventService.leaveBeevyEvent(this.eventID, this.user);
    this.viewCtrl.dismiss();
  }
  eventMelden(){
    this.eventService.eventMelden(this.eventID, this.user, "unknown reason");
    this.viewCtrl.dismiss();
  }

  idKopieren(){
    this.clipboard.copy(this.eventID);
    this.viewCtrl.dismiss();
  }

}
