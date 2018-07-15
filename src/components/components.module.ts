import {NgModule} from '@angular/core';
import {BeevyEventComponent} from './beevy-event/beevy-event';
import {IonicModule} from "ionic-angular";
import {EventCommentComponent} from './event-comment/event-comment';
import { TagComponent } from './tag/tag';

@NgModule({
  declarations: [BeevyEventComponent,
    EventCommentComponent,
    TagComponent],
  imports: [IonicModule],
  exports: [BeevyEventComponent,
    EventCommentComponent,
    TagComponent]
})
export class ComponentsModule {
}
