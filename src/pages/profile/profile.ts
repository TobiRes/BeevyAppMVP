import {Component, ViewChild} from '@angular/core';
import {Content, Events, NavController, PopoverController} from 'ionic-angular';
import {User} from "../../models/user.model";
import {MockService} from "../../services/mock.service";
import {PopoverComponent} from "../../components/popover/popover";
import {Storage} from "@ionic/storage";
import {BeevyEvent} from "../../models/event.model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  @ViewChild(Content) content: Content;
  user: User;
  joinedEventsActive?: boolean;
  avatarURL: string;
  private userExists: boolean = false;
  private currentlyLoading: boolean = true;

  constructor(public navCtrl: NavController,
              private mockService: MockService,
              public popoverCtrl: PopoverController,
              private storage: Storage,
              private userService: UserService,
              public events: Events) {
    this.joinedEventsActive = true;
  }

  ionViewWillEnter() {
    this.storage.get("user").then((user: User) => {
      if (user)
        this.user = user;
      if (user && user.currentAvatar) {
        this.avatarURL = "../../assets/imgs/" + user.currentAvatar + ".svg";
      } else {
        this.avatarURL = "../../assets/imgs/avatar_1.svg";
      }
    });
  }

  listJoined() {
    this.joinedEventsActive = true;
  }

  listCreated() {
    this.joinedEventsActive = false;
  }

  presentPopover(myEvent) {
    if (this.user && this.user.token && this.user.userID) {
      let popover = this.popoverCtrl.create(PopoverComponent);
      popover.present({
        ev: myEvent
      });
      popover.onDidDismiss((avatarString: string) => {
        if (avatarString && avatarString != this.user.currentAvatar) {
          this.user.currentAvatar = avatarString;
          this.avatarURL = "../../assets/imgs/" + avatarString + ".svg";
          this.storage.set("user", this.user).then(() => this.events.publish('avatarEvent', avatarString))
          this.userService.updateUserAvatar(this.user);
        }
      });
    }
  }

  scrollUp() {
    this.content.scrollToTop();
  }

  openEventView(beevyEvent: BeevyEvent) {
      this.navCtrl.push("EventViewPage", {beevyEvent: beevyEvent, user: this.user}, {animation: "ios-transition"});
  }
}
