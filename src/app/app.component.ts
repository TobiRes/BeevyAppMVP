import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import {UserService} from "../services/user.service";
import {Keyboard} from "@ionic-native/keyboard";
import {AndroidFullScreen} from "@ionic-native/android-full-screen";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, userService: UserService, keyboard: Keyboard, androidFullScreen: AndroidFullScreen) {
    platform.ready().then(() => {
      keyboard.disableScroll(false);
      userService.showAlertWhenTheAppIsLaunchedForTheFirstTime()
        .then(() => userService.checkForUserStateAndHandleRegistration())
        .catch(err => console.error(err));
      statusBar.overlaysWebView(true);
      statusBar.hide();
      splashScreen.hide();
      androidFullScreen.isImmersiveModeSupported()
        .then(() => androidFullScreen.immersiveMode())
        .catch((err) => console.error(err));
    });
  }
}
