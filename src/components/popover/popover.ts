import { Component } from '@angular/core';
import {User} from "../../models/user.model";
import {MockService} from "../../services/mock.service";
import {NavController, ViewController} from "ionic-angular";
import {ProfilePage} from "../../pages/profile/profile";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the PopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  text: string;
  user?: User;
  profile: ProfilePage;

  constructor( private mockService: MockService, public viewCtrl: ViewController, public navCtrl: NavController, private storage: Storage) {
  }

  close(avatarString) {
    this.viewCtrl.dismiss(avatarString);
  }
}
