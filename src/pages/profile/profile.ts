import {Component} from '@angular/core';
import {NavController, PopoverController} from 'ionic-angular';
import {User} from "../../models/user.model";
import {MockService} from "../../services/mock.service";
import {PopoverComponent} from "../../components/popover/popover";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: User;
  joinedEventsActive?: boolean;
  avatar1: string="../../assets/imgs/avatar_1.svg";
  /*avatar2: string="../../assets/imgs/avatar2.svg";
  avatar3: string="../../assets/imgs/avatar3.svg";
  avatar4: string="../../assets/imgs/avatar4.svg";
  avatar5: string="../../assets/imgs/avatar5.svg";
  avatar6: string="../../assets/imgs/avatar6.svg";
  avatar7: string="../../assets/imgs/avatar7.svg";
  avatar8: string="../../assets/imgs/avatar8.svg";
  avatar9: string="../../assets/imgs/avatar9.svg";
  avatar10: string="../../assets/imgs/avatar10.svg";
  avatar11: string="../../assets/imgs/avatar11.svg";
  avatar12: string="../../assets/imgs/avatar12.svg";*/

  constructor(public navCtrl: NavController, private mockService: MockService, public popoverCtrl: PopoverController) {
    this.joinedEventsActive = true;
  }

  ionViewDidEnter() {
    this.loadMockUser();
  }

  private loadMockUser() {
    this.mockService.checkIfUserExists()
      .then((user: User) => {
        if (!user) {
          this.mockService.createMockUser()
            .then(() => this.loadMockUser())
        } else {
          this.user = user;
          if (this.user.currentAvatar == null) this.user.currentAvatar = this.avatar1;
        }
      })
      .catch((err) => console.error(err))
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
}
