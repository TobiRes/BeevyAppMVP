import { Component } from '@angular/core';
import {User} from "../../models/user.model";

@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  text: string;
  user: User;

  constructor() {
  }

  selectAvatar(src){
    this.user.currentAvatar=src;
  }

}
