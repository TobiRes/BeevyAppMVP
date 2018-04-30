import {Component} from '@angular/core';

import {CreateEventPage} from '../create-event/create-event';
import {ProfilePage} from '../profile/profile';
import {HomePage} from '../home/home';

@Component({
  selector: "page-tabs",
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CreateEventPage;
  tab3Root = ProfilePage;

  constructor() {

  }
}
