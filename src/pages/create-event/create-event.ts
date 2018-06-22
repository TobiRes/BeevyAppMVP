import {Component} from '@angular/core';
import {LoadingController, NavController, Tabs} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {User} from "../../models/user.model";
import {BeevyEvent, BeevyEventType} from "../../models/event.model";
import {BeevyEventService} from "../../services/event.service";
import {UserService} from "../../services/user.service";
import {SetFilters} from "../../models/setFilters.model";


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

  constructor(public navCtrl: NavController,
              private storage: Storage,
              private eventService: BeevyEventService,
              private userService: UserService,
              private loadingCtrl: LoadingController) {
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
        token: user.token
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
    lastTab.select(0);
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
