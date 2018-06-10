import {Component, ViewChild} from '@angular/core';
import {Content, NavController, PopoverController} from 'ionic-angular';
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
  avatar1: string="../../assets/imgs/avatar_1.svg" + "";

  constructor(public navCtrl: NavController, private mockService: MockService, public popoverCtrl: PopoverController, private storage: Storage) {
    this.joinedEventsActive = true;
    this.storage.get("user").then((user: User) => this.user = user);
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
      console.log(avatarString);
      if(avatarString!=null) this.user.currentAvatar=avatarString;
      this.storage.set("user", this.user);
    });
  }

  scrollUp(){
    this.content.scrollToTop();
  }

}
