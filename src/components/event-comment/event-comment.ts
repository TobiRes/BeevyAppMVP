import {Component, Input} from '@angular/core';
import {BeevyEvent} from "../../models/event.model";
import {EventComment} from "../../models/comment.model";

@Component({
  selector: 'event-comment',
  templateUrl: 'event-comment.html'
})

export class EventCommentComponent {

  @Input()
  eventComment: EventComment;


  constructor() {

  }

}
