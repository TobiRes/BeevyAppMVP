import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { timer } from 'rxjs/observable/timer';
import {UserService} from "../services/user.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  filter: string[] = ["Videospiele", "Kunst", "Unterhaltung", "Projekte"];

  showSplash = true;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, userService: UserService) {
    platform.ready().then(() => {
      userService.handleUser()
        .catch(err => console.error(err));
      statusBar.styleDefault();
      splashScreen.hide();

    });
  }
}
