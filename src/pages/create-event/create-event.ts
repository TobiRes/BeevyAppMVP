import {Component} from '@angular/core';
import {LoadingController, NavController, Tabs} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {User} from "../../models/user.model";
import {BeevyEvent, BeevyEventType} from "../../models/event.model";
import {BeevyEventService} from "../../services/event.service";
import {UserService} from "../../services/user.service";
import {SetFilters} from "../../models/setFilters.model";
import {ToastService} from "../../services/toast.service";


@Component({
  selector: 'page-create-event',
  templateUrl: 'create-event.html'
})
export class CreateEventPage {

  title: string;
  summary: string;
  description: string;
  type: BeevyEventType;
  date: Date;
  time: Date;
  street: string;
  zip: number;
  city: string;
  tags = [];
  filter: SetFilters = {types: [], tags: []};
  possibleMemberCount: number = 1;
  private limitMembers: boolean = false;
  validation: number;
  completeCount: number = 0;

  constructor(public navCtrl: NavController,
              private storage: Storage,
              private eventService: BeevyEventService,
              private userService: UserService,
              private loadingCtrl: LoadingController,
              private toastService: ToastService) {
  }

  validateBeevent() {
    if(this.notAllRequiredDataEntered()){
      this.toastService.notComplete();
    } else if(this.summary.length > 42) {
      this.toastService.eventSummaryTooLong(this.summary.length - 42);
    } else if(this.description.length > 500) {
      this.toastService.eventDescriptionTooLong(this.description.length - 500);
    } else if(isNaN(this.zip) || this.zip.toString().length != 5) {
      this.toastService.zipNotCorrect();
    } else if(this.title.length < 3 || this.description.length < 15 || this.summary.length < 10 || this.city.length < 5 || this.street.length < 5){
      this.toastService.eventDataTooShort();
    }else if(this.street.length > 35){
      this.toastService.eventStreetTooLong(this.street.length - 30);
    } else if(!isNaN(this.title as any) || !isNaN(this.summary as any) || !isNaN(this.description as any) || !isNaN(this.street as any) || !isNaN(this.city as any)){
      this.toastService.eventNotValid();
    } else {
      this.createBeevent();
    }
  }

  private notAllRequiredDataEntered() {
    return !this.title || !this.summary || !this.description || !this.type || !this.date || !this.time || !this.street || !this.zip || !this.city;
  }

  createBeevent() {
    let loader = this.startLoading();
    loader.present();
    this.storage.get("user")
      .then((user: User) => {
        let beevent: BeevyEvent = this.fillEventData(user);
        this.eventService.createBeevyEvents(beevent)
          .subscribe(() => {
            this.userService.getUserEvents(user);
            this.jumpToHomePage();
            loader.dismissAll()
          }, () => {
            loader.dismissAll();
          })
      })
  }

  private fillEventData(user: User): BeevyEvent {
    return {
      admin: {
        username: user.username,
        userID: user.userID,
        token: user.token,
        adminAvatar: user.currentAvatar
      },
      title: this.title,
      summary: this.summary,
      description: this.description,
      type: this.type,
      date: new Date(this.date + "," + this.time),
      address: {
        street: this.street,
        zip: this.zip,
        city: this.city
      },
      possibleMemberCount: this.limitMembers ? this.possibleMemberCount : 26,
      currentMemberCount: 0,
      tags: []
    }
  }

  private startLoading() {
    return this.loadingCtrl.create({
      spinner: 'crescent',
    });
  }

  private jumpToHomePage() {
    let lastTab: Tabs = this.navCtrl.parent;
    this.storage.set("createdEvent", true)
      .then(() => {
        lastTab.select(0);
      })
      .catch(err => console.error(err))
  }

  changeColor(type: BeevyEventType, opacity: string): string{
    if (this.type == BeevyEventType.activity) return "beevy-info-background-" + opacity + "-1";
    if (this.type == BeevyEventType.hangout) return "beevy-info-background-" + opacity + "-2";
    if (this.type == BeevyEventType.project) return "beevy-info-background-" + opacity + "-0";
    return "beevy-info-background-" + opacity + "-2";
  }

  changeColorTags(type: BeevyEventType, opacity: string): string{
    if (this.type == BeevyEventType.activity) return "beevy-info-background-" + opacity + "-1-tags";
    if (this.type == BeevyEventType.hangout) return "beevy-info-background-" + opacity + "-2-tags";
    if (this.type == BeevyEventType.project) return "beevy-info-background-" + opacity + "-0-tags";
    return "beevy-info-background-" + opacity + "-2-tags";
  }

  toggleLimit() {
    this.limitMembers = !this.limitMembers;
  }
}
