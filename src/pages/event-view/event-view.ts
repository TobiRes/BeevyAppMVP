import {Component, ViewChild} from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  Modal, ModalController,
  ModalOptions,
  NavController,
  NavParams
} from 'ionic-angular';
import {BeevyEvent, BeevyEventType} from "../../models/event.model";
import {DateUtil} from "../../utils/date-util";
import {BeevyEventService} from "../../services/event.service";
import {ToastService} from "../../services/toast.service";
import {User} from "../../models/user.model";
import {CommentService} from "../../services/comment.service";
import {EventComment} from "../../models/comment.model";
import { Clipboard } from '@ionic-native/clipboard';
import {SetFilters} from "../../models/setFilters.model";


@IonicPage()
@Component({
  selector: 'page-event-view',
  templateUrl: 'event-view.html',
})
export class EventViewPage {

  beevyEvent: BeevyEvent;
  beevyEventType: string;
  showJoinButton: boolean;
  notAllowedtoSeeComments: boolean;
  noCommentsYet: boolean;
  showComments:boolean;
  commentBody: string;
  currentResponseCommentID: string;
  currentResponseCommentAuthor: string;
  adminAvatarURL: string;
  commentValidated: boolean;

  user: User;
  userIsEventAdmin: boolean;
  userIsEventMember: boolean;

  @ViewChild('focusInput') enterCommentField ;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private eventService: BeevyEventService,
              private commentService: CommentService,
              private clipboard: Clipboard,
              private modalCtrl: ModalController,
              private toastService: ToastService) {
    this.beevyEvent = this.navParams.get("beevyEvent");
    this.user = this.navParams.get("user");
    this.buildViewAccordingToEventAndUserState();
  }

  ionViewDidLoad() {
  }

  joinEvent() {
    this.eventService.joinBeevyEvent(this.beevyEvent);
    this.alertOfJoin();

    console.log(this.beevyEvent);
  }

  addNewComment(repliedTo: string | undefined){

    if(this.commentBody.length >= 280) {
      this.toastService.commentTooLong(this.commentBody.length-280);
    }
    else{

      if(this.currentResponseCommentID != "" && this.commentBody.includes(this.currentResponseCommentAuthor)){
        repliedTo = this.currentResponseCommentID;
        this.commentBody = this.commentBody.substring(this.currentResponseCommentAuthor.length);
      }


      let loading = this.startLoader();
      loading.present();
      this.commentService.addComment(this.beevyEvent.eventID, this.user.userID, this.user.token, this.commentBody, repliedTo)
        .then(() => this.handleComments())
        .then(() => {
          loading.dismissAll();
          this.commentBody = "";
        })
        .catch((err) => {
          console.error(err);
          loading.dismissAll();
        });

    }

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
    return new Promise(((resolve, reject) => {
      if(!this.userNotPartOfEvent()){
        this.notAllowedtoSeeComments = false;
        this.commentService.loadComments(this.user, this.beevyEvent)
          .then((eventComments: EventComment[]) => {
            this.beevyEvent.comments = eventComments;
            console.log(this.beevyEvent);
            if(eventComments== []){
              this.noCommentsYet = true;
            }else{
              this.showComments = true;
            }
            resolve();
          })
          .catch((err) =>reject(err));
      }
    }))
  }

  private startLoader() {
    return this.loadingCtrl.create();
  }

  respondToComment(comment: EventComment){
    this.currentResponseCommentAuthor ="@"+comment.author+": ";
    this.commentBody = this.currentResponseCommentAuthor;
    this.currentResponseCommentID = comment.commentID;

    //Keyboard.show(); // for android
    this.enterCommentField.setFocus();
  }

  openOptions() {
    const optionsModalOptions: ModalOptions = {
      cssClass: "filterModal",
      showBackdrop: true
    }
    const filterModal: Modal = this.modalCtrl.create("OptionsModalPage", {userIsEventAdmin: this.userIsEventAdmin, userIsEventMember: this.userIsEventMember, eventID: this.beevyEvent.eventID, user: this.user}, optionsModalOptions);
    filterModal.present();
    filterModal.onWillDismiss((setFilter: SetFilters) => {

    })
  }

  private buildViewAccordingToEventAndUserState() {
    this.showJoinButton = this.userNotPartOfEvent();
    this.defineProjectType();

    this.notAllowedtoSeeComments = true;
    this.noCommentsYet = false;
    this.showComments = false;

    this.handleComments()
      .catch(err => console.error(err));

    this.currentResponseCommentID="";
    this.currentResponseCommentAuthor="";
    this.commentValidated = false;

    if(this.user.userID == this.beevyEvent.admin.userID)
      this.userIsEventAdmin = true;
    else
      this.userIsEventAdmin = false;

    this.userIsEventMember = !this.userNotPartOfEvent();
    if(this.beevyEvent.admin.avatar){
      this.adminAvatarURL = "../../assets/imgs/" + this.beevyEvent.admin.avatar + ".svg";
    } else {
      this.adminAvatarURL = "../../assets/imgs/avatar_1.svg";
    }
  }
}
