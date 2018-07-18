import {Component} from '@angular/core';
import {LoadingController, NavController, Tabs} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {User} from "../../models/user.model";
import {BeevyEvent, BeevyEventType} from "../../models/event.model";
import {BeevyEventService} from "../../services/event.service";
import {UserService} from "../../services/user.service";
import {ToastService} from "../../services/toast.service";
import {DateUtil} from "../../utils/date-util";


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
  buttonDisabled: boolean = true;
  enteredTags: string[] = [];
  enterTag: string;
  defaultStartDate: string = new Date().toISOString();
  defaultEndDate: string = DateUtil.getLastPossibleDateInTheFuture();


  private limitMembers: boolean = false;

  constructor(public navCtrl: NavController,
              private storage: Storage,
              private eventService: BeevyEventService,
              private userService: UserService,
              private loadingCtrl: LoadingController,
              private toastService: ToastService) {
  }

  ionViewDidEnter(){
    this.storage.get("user")
      .then((user: User) => {
        if(user && user.userID && user.token) {
          this.buttonDisabled = false;
        }
      })
      .catch((err) => console.error(err))
  }

  validateBeevent() {
    if (this.notAllRequiredDataEntered()) {
      this.toastService.notComplete();
    } else if (this.title.length > 22) {
      this.toastService.eventTitleTooLong(this.title.length - 22);
    } else if (this.summary.length > 42) {
      this.toastService.eventSummaryTooLong(this.summary.length - 42);
    } else if (this.description.length > 500) {
      this.toastService.eventDescriptionTooLong(this.description.length - 500);
    } else if (isNaN(this.zip) || this.zip.toString().length != 5) {
      this.toastService.zipNotCorrect();
    } else if (this.title.length < 3) {
      this.toastService.eventTitleTooShort();
    } else if (this.description.length < 15) {
      this.toastService.eventDescriptionTooShort();
    }else if (this.summary.length < 10) {
      this.toastService.eventSummaryTooShort();
    }else if (this.city.length < 4) {
      this.toastService.eventCityTooShort();
    }else if (this.street.length < 5) {
      this.toastService.eventStreetTooShort();
    }else if (this.street.length > 30) {
      this.toastService.eventStreetTooLong(this.street.length - 30);
    } else if (this.city.length > 20) {
      this.toastService.eventCityTooLong(this.street.length - 20);
    } else if (!isNaN(this.title as any) || !isNaN(this.summary as any) || !isNaN(this.description as any) || !isNaN(this.street as any) || !isNaN(this.city as any)) {
      this.toastService.eventNotValid();
    } else {
      this.createBeevent();
    }
  }

  createBeevent() {
    let loader = this.startLoading();
    loader.present();
    this.storage.get("user")
      .then((user: User) => {
        let beevent: BeevyEvent = this.fillEventData(user);
        this.eventService.createBeevyEvents(beevent)
          .subscribe(() => {
            this.userService.getUserEvents(user)
              .catch(() => console.log("Couldn't get user events"));
            this.clearEnteredData();
            this.jumpToHomePage();
            loader.dismissAll()
          }, () => {
            loader.dismissAll();
          })
      })
  }

  changeColor(type: BeevyEventType, opacity: string): string {
    if (this.type == BeevyEventType.activity) return "beevy-info-background-" + opacity + "-1";
    if (this.type == BeevyEventType.hangout) return "beevy-info-background-" + opacity + "-2";
    if (this.type == BeevyEventType.project) return "beevy-info-background-" + opacity + "-0";
    return "beevy-info-background-" + opacity + "-2";
  }

  toggleLimit() {
    this.limitMembers = !this.limitMembers;
  }

  private notAllRequiredDataEntered() {
    return !this.title || !this.summary || !this.description || !this.type || !this.date || !this.time || !this.street || !this.zip || !this.city;
  }

  private fillEventData(user: User): BeevyEvent {
    return {
      admin: {
        username: user.username,
        userID: user.userID,
        token: user.token,
        avatar: user.currentAvatar
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
      tags: this.enteredTags,
      possibleMemberCount: this.limitMembers ? this.possibleMemberCount : 26,
      currentMemberCount: 0
    }
  }

  private startLoading() {
    return this.loadingCtrl.create({
      spinner: 'crescent',
      content: `Einen Moment bitte`,
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


  addTag(){
    var alreadyTag = false;
    for(var i=0; this.enteredTags!=null &&i<this.enteredTags.length; i++){
      if(this.enteredTags[i]==this.enterTag){
        alreadyTag = true;
      }
    }
    if(this.enterTag.length>1 && this.enterTag.length<= 15 && !alreadyTag){
      if(this.enteredTags!= null)
        this.enteredTags[this.enteredTags.length] = this.enterTag;
      else
        this.enteredTags[0] = this.enterTag;
    }
    this.enterTag = "";
  }
  deleteTag(tag: string){
    for(var i=0; i<this.enteredTags.length; i++){
      if(this.enteredTags[i]==tag)
        this.enteredTags.splice(i,1);
    }
  }

  private clearEnteredData() {
    this.title = "";
    this.summary = "";
    this.description = "";
    this.zip = null;
    this.date = null;
    this.time = null;
    this.city = "";
    this.possibleMemberCount = 1;
    this.buttonDisabled = true;
    this.enteredTags = [];
    this.enterTag = "";
    this.type = BeevyEventType.hangout;
    this.date = new Date();
  }
}
