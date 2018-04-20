import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {BeevyEvent} from "../../models/event.model";
import {MockService} from "../../services/mock.service";
import {BeevyEventService} from "../../services/event.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  events: BeevyEvent[] = [];

  constructor(public navCtrl: NavController,
              private mockService: MockService,
              private eventService: BeevyEventService) {
    this.getEvents();
  }

  openEventView(beevyEvent: BeevyEvent){
    this.navCtrl.push("EventViewPage", {beevyEvent: beevyEvent}, {animation: "ios-transition"});
  }

  private getEvents() {
    this.eventService.getBeevyEvents()
      .then((existingEvents: BeevyEvent[]) => {
        this.events = existingEvents;
      })
  }

  private getMockEvent(): BeevyEvent {
    return this.mockService.getMockEvent();
  }
}
