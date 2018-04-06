import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BeevyEvent} from "../../models/event.model";

@IonicPage()
@Component({
  selector: 'page-event-view',
  templateUrl: 'event-view.html',
})
export class EventViewPage {

  beevyEvent: BeevyEvent;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.beevyEvent = this.navParams.get("beevyEvent");
    console.log(this.beevyEvent);
  }

  ionViewDidLoad() {
  }
}
