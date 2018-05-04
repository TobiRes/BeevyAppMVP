import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {BeevyEvent, BeevyEventType} from "../../models/event.model";
import {Storage} from "@ionic/storage";
import {User} from "../../models/user.model";
import {MockService} from "../../services/mock.service";
import {DateUtil} from "../../utils/date-util";

@IonicPage()
@Component({
  selector: 'page-event-view',
  templateUrl: 'event-view.html',
})
export class EventViewPage {

  beevyEvent: BeevyEvent;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private alertCtrl: AlertController,
              private mockService: MockService) {
    this.beevyEvent = this.navParams.get("beevyEvent");
  }

  ionViewDidLoad() {
  }

  joinEvent() {
    this.mockService.checkIfUserExists()
      .then((user: User) => {
        if (!user) {
          this.mockService.createMockUser()
            .then(() => {
              this.joinEvent()
            })
        } else {
          if (!user.userProfile.joinedEvents) {
            user.userProfile.joinedEvents = [this.beevyEvent]
          } else {
            user.userProfile.joinedEvents.push(this.beevyEvent);
          }
          this.saveUpdatedUser(user);
        }
      })
      .catch(() => {

      })
  }

  private saveUpdatedUser(user: User) {
    this.storage.set("user", user)
      .then(() => {
        let alert = this.alertCtrl.create({
          title: 'Event beigetreten',
          subTitle: 'Du nimmst jetzt an diesem Event teil!',
          buttons: ['OK']
        });
        alert.present();
      })
  }

  //Methoden aus beevy-event.ts
  getDate(date: Date): string {
    return DateUtil.getWeekdayfull(date.getDay()) +" "+ DateUtil.getDayMonthYearOfDate(date);
  }

  getTime(date: Date): string {
    return DateUtil.getTime(date);
  }

  changeColorOfContainer(type: BeevyEventType, opacity: string): string {
    if (type == BeevyEventType.event) return "beevy-info-background-" + opacity + "-0";
    if (type == BeevyEventType.hangout) return "beevy-info-background-" + opacity + "-1";
    if (type == BeevyEventType.project) return "beevy-info-background-" + opacity + "-2";
    return "beevy-info-background-" + opacity + "-0";
  }
}
