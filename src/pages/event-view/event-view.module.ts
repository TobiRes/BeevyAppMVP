import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventViewPage } from './event-view';

@NgModule({
  declarations: [
    EventViewPage,
  ],
  imports: [
    IonicPageModule.forChild(EventViewPage),
  ],
})
export class EventViewPageModule {}
