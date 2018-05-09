import {Component} from '@angular/core';
import {Modal, ModalController, ModalOptions, NavController} from 'ionic-angular';
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
              private eventService: BeevyEventService,
              private modalCtrl: ModalController) {
  }

  ionViewDidEnter() {
    //this.getEvents();
    this.getMockEvents();
  }

  openEventView(beevyEvent: BeevyEvent) {
    this.navCtrl.push("EventViewPage", {beevyEvent: beevyEvent}, {animation: "ios-transition"});
  }

  private getEvents() {
    this.eventService.getBeevyEvents()
      .then((existingEvents: BeevyEvent[]) => {
        this.events = existingEvents;
      })
  }

  private getMockEvents() {
    for (var i = 0; i < 10; i++) {
      this.events[i] = this.mockService.getMockEvent();
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
}
