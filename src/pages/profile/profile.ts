import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {User} from "../../models/user.model";
import {MockService} from "../../services/mock.service";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  user: User;

  constructor(public navCtrl: NavController,
              private mockService: MockService,
              private storage: Storage) {
  }

  ionViewDidEnter() {
    this.loadUser();
    //this.loadMockUser();
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

  private loadUser() {
    this.storage.get("user")
      .then((user: User) => {
        this.user = user;
        console.log(this.user);
      })
  }
}
