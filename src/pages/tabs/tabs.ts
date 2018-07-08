import {Component} from '@angular/core';

import {CreateEventPage} from '../create-event/create-event';
import {ProfilePage} from '../profile/profile';
import {HomePage} from '../home/home';
import {User} from "../../models/user.model";
import {Storage} from "@ionic/storage";
import {Events} from "ionic-angular";

@Component({
  selector: "page-tabs",
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CreateEventPage;
  tab3Root = ProfilePage;
  currentAvatar: string = "avatar_1";

  constructor(private storage: Storage, public events: Events) {

    this.storage.get("user").then((user: User) => {
      if(user && user.currentAvatar) this.currentAvatar = user.currentAvatar;
    });

    events.subscribe('avatarEvent', (avatarString: string) => {
      this.changedAvatar(avatarString);
    });
  }

  changedAvatar(avatarString: string){
    this.currentAvatar = avatarString;
  }

}
