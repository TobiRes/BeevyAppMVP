import {Component} from '@angular/core';
import {Modal, ModalController, ModalOptions, NavController} from 'ionic-angular';
import {BeevyEvent, BeevyEventType} from "../../models/event.model";
import {BeevyEventService} from "../../services/event.service";
import {UserService} from "../../services/user.service";
import {Storage} from "@ionic/storage";
import {SetFilters} from "../../models/setFilters.model";
import {FilterUtil} from "../../utils/filter-util";
import {User} from "../../models/user.model";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  splash = true;

  displayedEvents: BeevyEvent[] = [];
  filteredEvents: BeevyEvent[] = [];
  allEvents: BeevyEvent[] = [];
  filter: SetFilters = {types: [true, true, true]};
  tabBarElement: any;

  private userExists: boolean = false;
  private currentlyLoading: boolean = true;
  private user: User;

  constructor(public navCtrl: NavController,
              private eventService: BeevyEventService,
              private modalCtrl: ModalController,
              private userService: UserService,
              private storage: Storage) {
    this.checkForUserStatus()
      .catch(err => console.error(err));
    this.resetFilter();
    this.storage.get("events")
      .then((events: BeevyEvent[]) => {
        this.allEvents = events;
        this.displayedEvents = this.allEvents;
        this.getEvents();
      });
  }

  ionViewDidEnter() {
    //TODO: Think of something better
    this.storage.get("createdEvent")
      .then((createdEvent) => {
        if (createdEvent) {
          this.getEvents()
          this.storage.set("createdEvent", false);
        }
      })
  }

  ionViewDidLoad() {
    this.tabBarElement = document.querySelector('.tabbar');
    this.tabBarElement.style.display = 'none';
    setTimeout(() => {
      this.splash = false;
      this.tabBarElement.style.display = 'flex';
    }, 7000);
  }

  openEventView(beevyEvent: BeevyEvent) {
    if (this.userExists) {
      this.navCtrl.push("EventViewPage", {beevyEvent: beevyEvent, user: this.user}, {animation: "ios-transition"});
    } else if (!this.userExists && !this.currentlyLoading) {
      this.currentlyLoading = true;
      this.userService.checkForUserStateAndHandleRegistration()
        .then(() => this.checkForUserStatus())
        .catch(err => {
          this.currentlyLoading = false;
          this.userExists = false;
          console.error(err)
        });
    } else if (this.currentlyLoading) {
      //TODO: Show alert;
    }
  }

  refreshEvents(refresher) {
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
        this.onlyShowFilteredEvents();
      }
    })
  }

  onlyShowFilteredEvents() {
    this.filteredEvents = [];
    for (let i = 0; i < this.allEvents.length; i++) {
      if (this.checkIfEventPassesFilter(this.allEvents[i])) {
        this.filteredEvents.push(this.allEvents[i]);
      }
    }
    this.displayedEvents = this.filteredEvents;
  }

  checkIfEventPassesFilter(event: BeevyEvent) {
    return (this.checkForSearchMatch(event)
      && this.checkForDateMatch(event.date)
      && this.checkForCityMatch(event.address.city)
      && this.checkForTypeMatch(event.type));
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

  private checkForUserStatus() {
    return new Promise((resolve, reject) => {
      this.storage.get("user")
        .then((user: User) => {
          this.currentlyLoading = false;
          if (!user || !(user.token && user.userID)) {
            this.userExists = false;
          } else {
            this.userExists = true;
            this.user = user;
          }
          resolve();
        })
        .catch(err => reject(err));
    })
  }

  private resetFilter() {
    this.filter = {};
    this.filter.tags = [];
    var today = new Date();
    today.setHours(today.getTimezoneOffset()/60,0,0,0);
    this.filter.earliestDate = today.toISOString();
    this.filter.lastDate = "2018-12-31T24:24:24.335Z";
    this.filter.types = [true, true, true];
    this.filter.city = "";
    this.filter.search = "";
  }

  private checkForSearchMatch(event: BeevyEvent): boolean {
    let beevyEventString = JSON.stringify(event).toLowerCase();
    return !(FilterUtil.eventDoesNotContainSearchString(this.filter.search, beevyEventString));
  }

  private checkForDateMatch(eventDate): boolean {
    return !(FilterUtil.eventDateIsBeforeOrAfterSpecifiedFilterDate(eventDate, this.filter.earliestDate, this.filter.lastDate));
  }

  private checkForCityMatch(eventCity: string): boolean {
    return !(FilterUtil.eventIsInDifferentCity(this.filter.city, eventCity));
  }

  private checkForTypeMatch(eventType: BeevyEventType): boolean {
    return !(FilterUtil.eventTypeDoesNotMatchFilteredEventTypes(this.filter.types, eventType));
  }
}


