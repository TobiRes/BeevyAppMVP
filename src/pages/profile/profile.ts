import {Component} from '@angular/core';
import {NavController, PopoverController} from 'ionic-angular';
import {User} from "../../models/user.model";
import {MockService} from "../../services/mock.service";
import {Storage} from "@ionic/storage";
import {PopoverComponent} from "../../components/popover/popover";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: User;
  joinedEventsActive?: boolean = true;
  avatar1: string="../../assets/imgs/avatar_1.svg";

  constructor(public navCtrl: NavController,
              private mockService: MockService,
              public popoverCtrl: PopoverController,
              private storage: Storage) {  }

  ionViewDidEnter() {
    this.loadUser();
  }

  private loadUser() {
    this.storage.get("user")
      .then((user: User) => {
        this.user = user;
        if (this.user.currentAvatar == null) this.user.currentAvatar = this.avatar1;
        console.log(this.user);
      })
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
  }

  checkClickedState() {
    if(this.joinedEventsActive) return "beevy-info-background-more-transparent-0";
    else return "";
  }
}
