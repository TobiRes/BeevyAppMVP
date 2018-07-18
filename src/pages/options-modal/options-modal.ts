import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Clipboard} from "@ionic-native/clipboard";
import {BeevyEventService} from "../../services/event.service";
import {ToastService} from "../../services/toast.service";
import {User} from "../../models/user.model";
import {Storage} from "@ionic/storage";
import {TabsPage} from "../tabs/tabs";

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
  userWantstoDelete: boolean;

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
    this.userWantstoDelete = false;
    this.eventTitle = this.navParams.get("eventTitle")
    this.normaleAnzeige = true;
  }

  deleteEvent() {
    this.eventService.deleteBeevyEvent(this.eventID, this.user)
      .then(() => this.jumpToHomePage())
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
      .then(() => this.navCtrl.setRoot(TabsPage))
      .catch(err => console.error(err));
  }

  dismissOptions(){
    this.viewCtrl.dismiss();
  }
  userWantstoReport(){
    this.userWantsToReportEvent = true;
    this.normaleAnzeige = false;
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
