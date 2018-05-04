import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import {CreateEventPage} from '../pages/create-event/create-event';
import { ProfilePage } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {HomePageModule} from "../pages/home/home.module";
import {ComponentsModule} from "../components/components.module";
import {MockService} from "../services/mock.service";
import {IonicStorageModule} from "@ionic/storage";
import {ProfilePageModule} from "../pages/profile/profile.module";
import {BeevyEventService} from "../services/event.service";
import {HttpClientModule} from "@angular/common/http";
import {CreateEventPageModule} from "../pages/create-event/create-event.module";
import {UserService} from "../services/user.service";

@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ComponentsModule,
    HomePageModule,
    CreateEventPageModule,
    ProfilePageModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CreateEventPage,
    ProfilePage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MockService,
    BeevyEventService,
    UserService
  ]
})
export class AppModule {}
