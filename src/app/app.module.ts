import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
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

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ComponentsModule,
    HomePageModule,
    ProfilePageModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ProfilePage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MockService,
    BeevyEventService
  ]
})
export class AppModule {}
