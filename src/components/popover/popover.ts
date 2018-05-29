import { Component } from '@angular/core';
import {User} from "../../models/user.model";

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
  user: User;

  constructor() {
  }

  selectAvatar(src){
    this.user.currentAvatar=src;
  }

}
