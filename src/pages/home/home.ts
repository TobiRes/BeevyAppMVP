import {Component} from '@angular/core';
import {Modal, ModalController, ModalOptions, NavController} from 'ionic-angular';
import {BeevyEvent, BeevyEventType} from "../../models/event.model";
import {MockService} from "../../services/mock.service";
import {BeevyEventService} from "../../services/event.service";
import {SetFilters} from "../../models/setFilters.model";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  events: BeevyEvent[] = [];
  filteredEvents: BeevyEvent[] = [];
  filter: SetFilters;

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
    filterModal.onWillDismiss((setFilter: SetFilters) => {
      this.filter= setFilter;
      console.log(this.filter);
      this.changeToFilteredEvents();
    })
  }
  changeToFilteredEvents(){
    console.log(this.events.length);
    for(var i=0; i<this.events.length; i ++){
      if(this.checkFiltermatch(this.events[i])){

      }
    }
    this.filteredEvents[0] = this.events[0];
    this.events = this.filteredEvents;
  }
  checkFiltermatch(event: BeevyEvent){
    var matches = true;
    return true;
  }
}
