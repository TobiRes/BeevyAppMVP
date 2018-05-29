import {Component} from '@angular/core';
import {Modal, ModalController, ModalOptions, NavController} from 'ionic-angular';
import {BeevyEvent, BeevyEventType} from "../../models/event.model";
import {MockService} from "../../services/mock.service";
import {BeevyEventService} from "../../services/event.service";
import {UserService} from "../../services/user.service";
import {Storage} from "@ionic/storage";
import {SetFilters} from "../../models/setFilters.model";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  displayedEvents: BeevyEvent[] = [];
  filteredEvents: BeevyEvent[] = [];
  allEvents: BeevyEvent[] = [];
  filter: SetFilters = {types: [true, true, true], tags: []};

  private userExists: boolean = false;
  private retryUserCheck: boolean = true;

  constructor(public navCtrl: NavController,
              private mockService: MockService,
              private eventService: BeevyEventService,
              private modalCtrl: ModalController,
              private userService: UserService,
              private storage: Storage) {
    this.checkForUserStatus();
    this.resetFilter();
    this.storage.get("events")
      .then((events: BeevyEvent[]) => {
        this.allEvents = events;
        this.displayedEvents = this.allEvents;
        this.getEvents();
      });
  }

  ionViewDidEnter() {
  }

  openEventView(beevyEvent: BeevyEvent) {
    if(this.userExists){
      this.navCtrl.push("EventViewPage", {beevyEvent: beevyEvent}, {animation: "ios-transition"});
    } else {
      this.manageUserStatus();
    }
  }

  refreshEvents(refresher){
    setTimeout(() => {
      this.getEvents()
        .then(() => refresher.complete());
    }, 2000);
  }

  openFilter() {
    const filterModalOptions: ModalOptions = {
      cssClass: "filterModal",
      showBackdrop: true
    }
    const filterModal: Modal = this.modalCtrl.create("FilterModalPage", {filter: this.filter}, filterModalOptions);
    filterModal.present();
    filterModal.onWillDismiss((setFilter: SetFilters) => {
      if (setFilter != null) {
        this.filter = setFilter;
        this.changeToFilteredEvents();
      }
    })
  }

  changeToFilteredEvents() {
    this.filteredEvents = [];
    for (let i = 0; i < this.allEvents.length; i++) {
      if (this.checkFiltermatch(this.allEvents[i])) {
        this.filteredEvents.push(this.allEvents[i]);
      }
    }
    this.displayedEvents = this.filteredEvents;
  }

  checkFiltermatch(event: BeevyEvent) {
    //check for Tags
    let matches = false;
    if (this.filter.tags.length < 1 || this.filter.tags == undefined)
      matches = true;
    else {
      for (let i = 0; i < this.filter.tags.length; i++) {
        for (let i2 = 0; i2 < event.tags.length; i2++) {
          if (this.filter.tags[i].toLowerCase() == event.tags[i2].toLowerCase()) matches = true;
        }
      }
    }

    //check for search
    let beevyEventString = JSON.stringify(event).toLowerCase();
    if (this.filter.search != "" && !(beevyEventString.indexOf(this.filter.search.toLowerCase()) > -1)) matches = false;

    //check for date
    if (new Date(event.date).toISOString() < this.filter.earliestDate) matches = false;
    if (new Date(event.date).toISOString() > this.filter.latestDate) matches = false;

    //Check for City
    if (this.filter.city != "" && event.address.city.toLowerCase() != this.filter.city.toLowerCase()) matches = false;

    //check for Types
    if (this.filter.types[0] == false && event.type == BeevyEventType.project) matches = false;
    if (this.filter.types[1] == false && event.type == BeevyEventType.activity) matches = false;
    if (this.filter.types[2] == false && event.type == BeevyEventType.hangout) matches = false;

    return matches;
  }

  private getEvents() {
    return new Promise(((resolve, reject) => {
      this.eventService.getBeevyEvents()
        .then((existingEvents: BeevyEvent[]) => {
          this.setAndSaveEvents(existingEvents);
          resolve();
        })
        .catch(err => {
          reject;
          console.error(err);
        });
    }))
  }

  private setAndSaveEvents(beevents: BeevyEvent[]) {
    this.allEvents = beevents;
    this.displayedEvents = this.allEvents;
    this.storage.set("events", this.allEvents);
  }

  private getMockEvents() {
    for (let i = 1; i <= 5; i++) {
      this.allEvents.push(this.mockService.getMockEvent(i));
    }
  }

  private manageUserStatus() {
    if(this.retryUserCheck){
      this.checkForUserStatus();
      this.retryUserCheck = false;
    } else {
      this.userService.handleUser();
      this.retryUserCheck = true;
    }
  }

  private checkForUserStatus(){
    this.userService.checkIfUserExists()
      .then((userStatus: boolean) => this.userExists = userStatus)
      .catch((err)=> {
        console.error(err);
        this.userExists = false;
      })
    this.eventService.getBeevyEvents()
      .then((existingEvents: BeevyEvent[]) => {
        this.allEvents = existingEvents;
      })
  }

  private resetFilter() {
    this.filter = {};
    this.filter.tags = [];
    this.filter.earliestDate = new Date().toISOString();
    this.filter.latestDate = "2018-12-31T24:24:24.335Z";
    this.filter.types = [true, true, true];
    this.filter.city = "";
    this.filter.search = "";
  }
}
