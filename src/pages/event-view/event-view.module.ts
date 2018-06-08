import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {EventViewPage} from './event-view';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    EventViewPage,
  ],
  imports: [
    IonicPageModule.forChild(EventViewPage),
    ComponentsModule
  ],
})
export class EventViewPageModule {
}
