import {Component} from '@angular/core';
import {Modal, ModalController, ModalOptions, NavController} from 'ionic-angular';
import {BeevyEvent} from "../../models/event.model";
import {MockService} from "../../services/mock.service";
import {BeevyEventService} from "../../services/event.service";
import {UserService} from "../../services/user.service";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  events: BeevyEvent[] = [];
  private userExists: boolean = false;
  private retryUserCheck: boolean = true;

  constructor(public navCtrl: NavController,
              private mockService: MockService,
              private eventService: BeevyEventService,
              private modalCtrl: ModalController,
              private userService: UserService,
              private storage: Storage) {
    this.checkForUserStatus();
  }

  ionViewDidEnter() {
    this.storage.get("events")
      .then((events: BeevyEvent[]) => {
        this.events = events;
        this.getEvents();
      })
    //this.getMockEvents();
  }

  openEventView(beevyEvent: BeevyEvent) {
    if(this.userExists){
      this.navCtrl.push("EventViewPage", {beevyEvent: beevyEvent}, {animation: "ios-transition"});
    } else {
      this.manageUserStatus();
    }
  }

  openFilter() {
    const filterModalOptions: ModalOptions = {
      cssClass: "filterModal",
      showBackdrop: true
    }
    const filterModal: Modal = this.modalCtrl.create("FilterModalPage", {test1: "test", test2: "test2"}, filterModalOptions);
    filterModal.present();
    filterModal.onWillDismiss((filterOptions) => {
    })
  }

  refreshEvents(refresher){
    setTimeout(() => {
      this.getEvents();
    }, 2000);
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
    this.events = beevents;
    this.storage.set("events", this.events);
  }

  private getMockEvents() {
    for (var i = 0; i < 10; i++) {
      this.events[i] = this.mockService.getMockEvent();
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
  }
}
