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

    let event1 = {
      admin: clara,
      title: "Sketch Night",
      summary: "Sketch & Chill bei Clara",
      description: "Chilliger Abend mit Essen und zeichnen. Freu mich auf euch!",
      type: BeevyEventType.event,
      date: new Date("April 17, 2018"),
      address: address,
      registeredMembers: [],
      possibleMemberCount: 7,
      currentMemberCount: 0
    }

    let tobisProfile: Profile = {
      mail: "treski@stud.hs-offenburg.de",
      token: "67890"
    }
    let tobi: User = {
      name: "Tobi",
      userID: "456",
      userProfile: tobisProfile
    }
    let address2: Address = {
      street: "Am Osterbach 26",
      zip: 77654,
      city: "Offenburg"
    }

    let event2 = {
      admin: tobi,
      title: "Zock-Projekt",
      summary: "Eine Woche Spiele testen",
      description: "Wir testen eine Woche lang verschiedene Spiele und machen eine Hausarbeit",
      type: BeevyEventType.project,
      date: new Date("April 20, 2018"),
      address: address2,
      registeredMembers: [],
      possibleMemberCount: 7,
      currentMemberCount: 0
    }

    let random: number = Math.floor(Math.random() * 2 + 1);
    if(random == 1)
      return event1;
    return event2
  }
}
