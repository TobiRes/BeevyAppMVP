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
  allEvents: BeevyEvent[] = [];
  filter: SetFilters = {types: [], tags: []};

  constructor(public navCtrl: NavController,
              private mockService: MockService,
              private eventService: BeevyEventService,
              private modalCtrl: ModalController) {
    this.filter.types[0] = true;
    this.filter.types[1] = true;
    this.filter.types[2] = true;
  }

  ionViewDidEnter() {
    //this.getEvents();
    this.allEvents = [];
    this.getMockEvents();
    this.events = this.allEvents;
  }

  openEventView(beevyEvent: BeevyEvent) {
    this.navCtrl.push("EventViewPage", {beevyEvent: beevyEvent}, {animation: "ios-transition"});
  }

  private getEvents() {
    this.eventService.getBeevyEvents()
      .then((existingEvents: BeevyEvent[]) => {
        this.allEvents = existingEvents;
      })
  }

  private getMockEvents() {
    for (var i = 1; i <= 5; i++) {
      this.allEvents.push(this.mockService.getMockEvent(i));
    }
  }

  openFilter() {
    const filterModalOptions: ModalOptions = {
      cssClass: "filterModal",
      showBackdrop: true
    }
    const filterModal: Modal = this.modalCtrl.create("FilterModalPage", {filter: this.filter}, filterModalOptions);
    filterModal.present();
    filterModal.onWillDismiss((setFilter: SetFilters) => {
      if(setFilter != null){
        this.filter= setFilter;
        console.log(this.filter);
        this.changeToFilteredEvents();
      }
    })
  }
  changeToFilteredEvents(){
    this.filteredEvents = [];
    if(this.filter.search != null){
      for(var i=0; i<this.allEvents.length; i ++){
        if(this.checkSearchMatch(this.allEvents[i])){
          this.filteredEvents.push(this.allEvents[i]);
        }
      }
    }
    else{
      for(var i2=0; i2<this.allEvents.length; i2 ++){
        if(this.checkFiltermatch(this.allEvents[i2])){
          this.filteredEvents.push(this.allEvents[i2]);
        }
      }
    }
    this.events = this.filteredEvents;
  }
  checkFiltermatch(event: BeevyEvent){
    var matches = false;
    if(this.filter.tags.length < 1 || this.filter.tags == undefined) matches = true;
    else{
      for(var i=0; i< this.filter.tags.length; i++){
        for(var i2=0; i2< event.tags.length; i2++){
          if(this.filter.tags[i].toLowerCase()==event.tags[i2].toLowerCase()) matches = true;
        }
      }
    }
    if(this.filter.types[0]== false && event.type == BeevyEventType.project) matches = false;
    if(this.filter.types[1]== false && event.type == BeevyEventType.activity) matches = false;
    if(this.filter.types[2]== false && event.type == BeevyEventType.hangout) matches = false;


    return matches;
  }
  checkSearchMatch(event: BeevyEvent){
    var beevyEventString = JSON.stringify(event).toLowerCase();
    if(beevyEventString.includes(this.filter.search.toLowerCase())) return true;
    else return false;
  }
}
