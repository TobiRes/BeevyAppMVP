import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {User} from "../../models/user.model";
import {MockService} from "../../services/mock.service";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  user: User;

  constructor(public navCtrl: NavController, private mockService: MockService) {
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
        }
      })
      .catch((err) => console.error(err))
  }
}
