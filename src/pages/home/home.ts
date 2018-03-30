import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Profile, User} from "../../models/user.model";
import {Address} from "../../models/address.model";
import {BeevyEvent, BeevyEventType} from "../../models/event.model";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  events: BeevyEvent[] = [];

  constructor(public navCtrl: NavController) {
    this.getEvents();
  }

  private getEvents() {
    for(let i = 0; i < 20; i++){
      let event = this.getMockEvent();
      this.events.push(event);
    }
    console.log(this.events);
  }

  private getMockEvent(): BeevyEvent {
    let clarasProfile: Profile = {
      mail: "cdeitmar@stud.hs-offenburg.de",
      token: "12345"
    }
    let clara: User = {
      name: "Clara",
      userID: "123",
      userProfile: clarasProfile
    }
    let address: Address = {
      street: "Weingartenstraße 10",
      zip: 77654,
      city: "Offenburg"
    }
    return {
      admin: clara,
      title: "Sketch Night",
      summary: "Sketch & Chill bei Clara",
      description: "Chilliger Abend mit Essen und zeichnen. Freu mich auf euch!",
      type: BeevyEventType.event,
      date: new Date(),
      address: address,
      registeredMembers: [],
      possibleMemberCount: 7,
      currentMemberCount: 0
    }
  }
}
