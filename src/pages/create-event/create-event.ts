import {Component} from '@angular/core';
import {LoadingController, NavController, Tabs} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {User} from "../../models/user.model";
import {BeevyEvent, BeevyEventType} from "../../models/event.model";
import {BeevyEventService} from "../../services/event.service";
import {UserService} from "../../services/user.service";
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
  possibleMemberCount: number = 1;
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
    this.validation = 0;
    this.completeCount = 0;

   if ((typeof this.title == "string") && (this.title.length > 0)) {
      if (this.title.length > 22) {
        this.toastService.eventTitleTooLong(this.title.length - 22);
      } else {
        this.validation += 1;
      }
    } else {
      this.completeCount += 1;
    }

    if ((typeof this.summary == "string") && (this.summary.length > 0)) {
      if (this.summary.length > 42) {
        this.toastService.eventSummaryTooLong(this.summary.length - 42);
      } else {
        this.validation += 1;
      }
    } else {
      this.completeCount += 1;
    }

    if ((typeof this.description == "string") && (this.description.length > 0)) {
      if (this.description.length > 500) {
        this.toastService.eventDescriptionTooLong(this.description.length - 500);
      } else {
        this.validation += 1;
      }
    } else {
      this.completeCount += 1;
    }

    if (this.type == undefined) {
      this.completeCount += 1;
    } else {
      this.validation += 1;
    }

    if (this.date == undefined) {
      this.completeCount += 1;
    } else {
      this.validation += 1;
    }

    if (this.time == undefined) {
      this.completeCount += 1;
    } else {
      this.validation += 1;
    }

    if ((typeof this.street == "string") && (this.street.length > 0)) {
      if (this.street.length > 30) {
        this.toastService.eventStreetTooLong(this.street.length - 30);
      } else {
        this.validation += 1;
      }
    } else {
      this.completeCount += 1;
    }

    if (this.zip != null) {
        this.validation += 1;
    } else {
      this.completeCount += 1;
    }

   if ((typeof this.city == "string") && (this.city.length > 0)) {
      if (this.city.length > 30) {
        this.toastService.eventCityTooLong(this.city.length - 30);
      } else {
        this.validation += 1;
      }
    } else {
      this.completeCount += 1;
    }

   if(this.completeCount >0){this.toastService.notComplete();}

    if(this.validation==9){
      this.createBeevent();
    }else{
      if(this.completeCount == 0) this.toastService.eventNotValid();
    }
  }

  createBeevent() {
    //TODO: Return to home page
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
      possibleMemberCount: this.possibleMemberCount,
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
    lastTab.select(0);
  }
}
