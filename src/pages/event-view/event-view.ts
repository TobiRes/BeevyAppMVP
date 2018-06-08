import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {BeevyEvent, BeevyEventType} from "../../models/event.model";
import {Storage} from "@ionic/storage";
import {MockService} from "../../services/mock.service";
import {DateUtil} from "../../utils/date-util";
import {BeevyEventService} from "../../services/event.service";
import {User} from "../../models/user.model";
import {CommentService} from "../../services/comment.service";
import {EventComment} from "../../models/comment.model";

@IonicPage()
@Component({
  selector: 'page-event-view',
  templateUrl: 'event-view.html',
})
export class EventViewPage {

  beevyEvent: BeevyEvent;
  beevyEventType: string;
  showJoinButton: boolean;

  private user: User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private alertCtrl: AlertController,
              private mockService: MockService,
              private eventService: BeevyEventService,
              private commentService: CommentService) {
    this.beevyEvent = this.navParams.get("beevyEvent");
    this.user = this.navParams.get("user");
    this.showJoinButton = this.userNotPartOfEvent();
    this.defineProjectType();
    this.handleComments();
  }

  ionViewDidLoad() {
  }

  joinEvent() {
    this.eventService.joinBeevyEvent(this.beevyEvent);
    this.alertOfJoin()
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

  private userNotPartOfEvent(): boolean {
    //TODO: Add user to registeredMembers in the front end, then get overwritten by backend
    return (!this.beevyEvent.registeredMembers || !(this.beevyEvent.registeredMembers.indexOf(this.user.userID) != -1 || this.beevyEvent.admin.userID == this.user.userID));
  }

  private defineProjectType() {
    if (this.beevyEvent.type == BeevyEventType.project) this.beevyEventType = "Projekt";
    if (this.beevyEvent.type == BeevyEventType.activity) this.beevyEventType = "Aktivität";
    if (this.beevyEvent.type == BeevyEventType.hangout) this.beevyEventType = "Hangout";
  }

  private handleComments() {
    if(!this.userNotPartOfEvent()){
      this.commentService.loadComments(this.user, this.beevyEvent)
        .then((eventComments: EventComment[]) => {
          this.beevyEvent.comments = eventComments;
          console.log(this.beevyEvent);
        })
        .catch((err) => console.error(err));
    }
  }
}
