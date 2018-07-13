import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import {UserService} from "../services/user.service";
import {Keyboard} from "@ionic-native/keyboard";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, userService: UserService, keyboard: Keyboard) {
    platform.ready().then(() => {
      keyboard.disableScroll(false);
      userService.checkForUserStateAndHandleRegistration()
        .catch(err => console.error(err));
      statusBar.overlaysWebView(true);
      statusBar.hide();
      splashScreen.hide();

    });
  }
}
