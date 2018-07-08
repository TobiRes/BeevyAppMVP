import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Tabs, ViewController} from 'ionic-angular';
import {Clipboard} from "@ionic-native/clipboard";
import {BeevyEventService} from "../../services/event.service";
import {ToastService} from "../../services/toast.service";
import {User} from "../../models/user.model";
import {Storage} from "@ionic/storage";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
  selector: 'page-options-modal',
  templateUrl: 'options-modal.html',
})
export class OptionsModalPage {

  userIsEventAdmin: boolean;
  userIsEventMember: boolean;
  eventID: string;
  eventTitle: string;
  user: User;
  userWantsToReportEvent: boolean;
  reportReason: string;
  normaleAnzeige: boolean;
  userWantstoLeave: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private clipboard: Clipboard,
              private eventService: BeevyEventService,
              private viewCtrl: ViewController,
              private storage: Storage,
              private toastService: ToastService) {
    this.userIsEventAdmin = this.navParams.get("userIsEventAdmin");
    this.userIsEventMember = this.navParams.get("userIsEventMember");
    this.user = this.navParams.get("user");
    this.eventID = this.navParams.get("eventID");
    this.userWantsToReportEvent = false;
    this.eventTitle = this.navParams.get("eventTitle")
    this.normaleAnzeige = true;
  }

  ionViewDidLoad() {
    console.log(this.userIsEventAdmin);
    console.log(this.userIsEventMember);
  }

  deleteEvent() {
    this.eventService.deleteBeevyEvent(this.eventID, this.user)
      .then(() => this.viewCtrl.dismiss())
      .then(() => this.storage.set("createdEvent", true))
      .then(() => this.navCtrl.setRoot(HomePage))
      .catch((err) => {
        console.error(err);
        this.viewCtrl.dismiss();
      });
  }

  userWantsToLeaveEvent(){
    this.normaleAnzeige = false;
    this.userWantstoLeave = true;
  }

  leaveEvent(){
    this.eventService.leaveEvent(this.eventID, this.user);
    this.toastService.leftEvent(this.eventTitle);
    this.jumpToHomePage();
  }

  private jumpToHomePage() {
    this.viewCtrl.dismiss()
      .then(() => this.storage.set("createdEvent", true))
      .then(() => this.navCtrl.setRoot(HomePage))
      .catch(err => console.error(err));
  }

  dismissOptions(){
    this.viewCtrl.dismiss();
  }
  userWantstoReport(){
    this.userWantsToReportEvent = true;
    this.normaleAnzeige = false;
    //this.eventService.reportEvent(this.eventID, this.user, "unknown reason");
    //this.viewCtrl.dismiss();
  }
  reportEvent(){
    this.eventService.reportEvent(this.eventID, this.user, this.reportReason);
    this.toastService.reportedEvent();
    this.viewCtrl.dismiss();
  }

  copyID() {
    this.clipboard.copy(this.eventID);
    this.toastService.copiedID(this.eventTitle);
    this.viewCtrl.dismiss();
  }

}
