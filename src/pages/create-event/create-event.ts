import {Component} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {User} from "../../models/user.model";
import {BeevyEvent, BeevyEventType} from "../../models/event.model";
import {BeevyEventService} from "../../services/event.service";
import {UserService} from "../../services/user.service";


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
  possibleMemberCount: number;

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
            this.userService.getUserEvents(user)
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
      possibleMemberCount: this.possibleMemberCount,
      currentMemberCount: 0,
      tags : []
    }
  }

  private startLoading() {
    return this.loadingCtrl.create({
      spinner: 'crescent',
    });
  }
}
