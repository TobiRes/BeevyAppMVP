import {NgModule} from '@angular/core';
import {BeevyEventComponent} from './beevy-event/beevy-event';
import {IonicModule} from "ionic-angular";
import { EventCommentComponent } from './event-comment/event-comment';

@NgModule({
  declarations: [BeevyEventComponent,
    EventCommentComponent],
  imports: [IonicModule],
  exports: [BeevyEventComponent,
    EventCommentComponent]
})
export class ComponentsModule {
}
