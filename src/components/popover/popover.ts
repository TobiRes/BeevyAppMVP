import {Component} from '@angular/core';
import {User} from "../../models/user.model";
import {NavController, ViewController} from "ionic-angular";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  text: string;
  user?: User;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, private storage: Storage) {
  }

  close(avatarString) {
    this.viewCtrl.dismiss(avatarString);
  }
}
