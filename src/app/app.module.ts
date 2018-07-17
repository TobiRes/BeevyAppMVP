import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {CreateEventPage} from '../pages/create-event/create-event';
import {ProfilePage} from '../pages/profile/profile';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HomePageModule} from "../pages/home/home.module";
import {ComponentsModule} from "../components/components.module";
import {IonicStorageModule} from "@ionic/storage";
import {ProfilePageModule} from "../pages/profile/profile.module";
import {BeevyEventService} from "../services/event.service";
import {HttpClientModule} from "@angular/common/http";
import {CreateEventPageModule} from "../pages/create-event/create-event.module";
import {UserService} from "../services/user.service";
import {Device} from "@ionic-native/device";
import {ToastService} from "../services/toast.service";
import {PopoverComponent} from "../components/popover/popover";
import {CommentService} from "../services/comment.service";
import {Clipboard} from "@ionic-native/clipboard";
import { Keyboard } from '@ionic-native/keyboard';
import {AndroidFullScreen} from "@ionic-native/android-full-screen";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    PopoverComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: true, backButtonText: '',}),
    IonicStorageModule.forRoot(),
    ComponentsModule,
    HomePageModule,
    CreateEventPageModule,
    ProfilePageModule,
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CreateEventPage,
    ProfilePage,
    HomePage,
    TabsPage,
    PopoverComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BeevyEventService,
    UserService,
    ToastService,
    Device,
    CommentService,
    Clipboard,
    Keyboard,
    AndroidFullScreen
  ]
})
export class AppModule {
}
