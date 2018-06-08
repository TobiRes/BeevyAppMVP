import {NgModule} from '@angular/core';
import {BeevyEventComponent} from './beevy-event/beevy-event';
import {IonicModule} from "ionic-angular";
import { CommentComponent } from './comment/comment';
import { EventCommentComponent } from './event-comment/event-comment';

@NgModule({
  declarations: [BeevyEventComponent,
    CommentComponent,
    EventCommentComponent],
  imports: [IonicModule],
  exports: [BeevyEventComponent,
    CommentComponent,
    EventCommentComponent]
})
export class ComponentsModule {
}
