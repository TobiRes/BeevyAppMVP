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
import {MockService} from "../services/mock.service";
import {IonicStorageModule} from "@ionic/storage";
import {ProfilePageModule} from "../pages/profile/profile.module";
import {BeevyEventService} from "../services/event.service";
import {HttpClientModule} from "@angular/common/http";
import {CreateEventPageModule} from "../pages/create-event/create-event.module";
import {UserService} from "../services/user.service";
import {Device} from "@ionic-native/device";
import {ToastService} from "../services/toast.service";
import {RlTagInputModule} from 'angular2-tag-input';
import {PopoverComponent} from "../components/popover/popover";
import {CommentService} from "../services/comment.service";
import {Clipboard} from "@ionic-native/clipboard";
import { Keyboard } from '@ionic-native/keyboard';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    PopoverComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ComponentsModule,
    HomePageModule,
    CreateEventPageModule,
    ProfilePageModule,
    HttpClientModule,
    RlTagInputModule
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
    MockService,
    BeevyEventService,
    UserService,
    ToastService,
    Device,
    CommentService,
    Clipboard,
    Keyboard
  ]
})
export class AppModule {
}
