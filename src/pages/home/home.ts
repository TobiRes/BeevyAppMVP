import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {BeevyEvent} from "../../models/event.model";
import {MockService} from "../../services/mock.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  events: BeevyEvent[] = [];

  constructor(public navCtrl: NavController, private mockService: MockService) {
    this.getEvents();
  }

  openEventView(beevyEvent: BeevyEvent){
    this.navCtrl.push("EventViewPage", {beevyEvent: beevyEvent}, {animation: "ios-transition"});
  }

  private getEvents() {
    for(let i = 0; i < 20; i++){
      let event = this.getMockEvent();
      this.events.push(event);
    }
    console.log(this.events);
  }

  private getMockEvent(): BeevyEvent {
    return this.mockService.getMockEvent();
  }
}
