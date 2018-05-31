import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {BeevyEvent, BeevyEventType} from "../../models/event.model";
import {Storage} from "@ionic/storage";
import {MockService} from "../../services/mock.service";
import {DateUtil} from "../../utils/date-util";
import {BeevyEventService} from "../../services/event.service";
import {User} from "../../models/user.model";

@IonicPage()
@Component({
  selector: 'page-event-view',
  templateUrl: 'event-view.html',
})
export class EventViewPage {

  beevyEvent: BeevyEvent;
  beevyEventType: string;
  private user: User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private alertCtrl: AlertController,
              private mockService: MockService,
              private eventService: BeevyEventService) {
    this.beevyEvent = this.navParams.get("beevyEvent");
    this.user = this.navParams.get("user");
    if (this.beevyEvent.type == BeevyEventType.project) this.beevyEventType = "Projekt";
    if (this.beevyEvent.type == BeevyEventType.activity) this.beevyEventType = "Aktivität";
    if (this.beevyEvent.type == BeevyEventType.hangout) this.beevyEventType = "Hangout";
  }

  ionViewDidLoad() {
  }

  joinEvent() {
    this.eventService.joinBeevyEvent(this.beevyEvent);
    this.alertOfJoin()
  }

  notAlreadyJoinedByUser(): boolean {
    //TODO: Add user to registeredMembers in the front end, then get overwritten by backend
    if(this.beevyEvent.registeredMembers.find((user: string) => user == this.user.userID) || this.beevyEvent.admin.userID == this.user.userID){
      return false;
    }
    return true;
  }

  getDate(date: Date): string {
    return DateUtil.getWeekdayfull(new Date(date).getDay()) + " " + DateUtil.getDayMonthYearOfDate(date);
  }

  getTime(date: Date): string {
    return DateUtil.getTime(date);
  }

  changeColorOfContainer(type: BeevyEventType, opacity: string): string {
    if (type == BeevyEventType.activity) return "beevy-info-background-" + opacity + "-1";
    if (type == BeevyEventType.hangout) return "beevy-info-background-" + opacity + "-2";
    if (type == BeevyEventType.project) return "beevy-info-background-" + opacity + "-0";
    return "beevy-info-background-" + opacity + "-0";
  }

  private alertOfJoin() {
    let alert = this.alertCtrl.create({
      title: 'Event beigetreten',
      subTitle: 'Du nimmst jetzt an diesem Event teil!',
      buttons: ['OK']
    });
    alert.present();
  }
}
