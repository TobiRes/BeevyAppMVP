import {Component, ViewChild} from '@angular/core';
import {Content, Events, NavController, PopoverController} from 'ionic-angular';
import {User} from "../../models/user.model";
import {MockService} from "../../services/mock.service";
import {PopoverComponent} from "../../components/popover/popover";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  @ViewChild(Content) content: Content;
  user: User;
  joinedEventsActive?: boolean;
  avatarURL: string;

  constructor(public navCtrl: NavController, private mockService: MockService, public popoverCtrl: PopoverController, private storage: Storage, public events: Events) {
    this.joinedEventsActive = true;
  }

  ionViewWillEnter() {
    this.storage.get("user").then((user: User) => {
      this.user = user;
      //this.avatarURL = "../../assets/imgs/" + user.currentAvatar + ".svg";
    });
  }

  listJoined() {
    this.joinedEventsActive = true;
  }

  listCreated() {
    this.joinedEventsActive = false;
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss((avatarString: string) => {
      if (avatarString) this.user.currentAvatar = avatarString;
      this.avatarURL = "../../assets/imgs/" + avatarString + ".svg";
      //Todo: avatarURL in Db + hier losschicken
      this.events.publish('avatarEvent', avatarString);
    });
  }

  scrollUp() {
    this.content.scrollToTop();
  }

}
