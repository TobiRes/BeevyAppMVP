import {Component, Input} from '@angular/core';
import {BeevyEvent, BeevyEventType} from "../../models/event.model";
import {EventComment} from "../../models/comment.model";

@Component({
  selector: 'event-comment',
  templateUrl: 'event-comment.html'
})

export class EventCommentComponent {

  @Input()
  eventComment: EventComment;
  @Input()
  type: BeevyEventType;


  constructor() {

  }

  changeColorOfContainer(type: BeevyEventType, opacity: string): string {
    if (type == BeevyEventType.activity) return "beevy-info-background-" + opacity + "-1";
    if (type == BeevyEventType.hangout) return "beevy-info-background-" + opacity + "-2";
    if (type == BeevyEventType.project) return "beevy-info-background-" + opacity + "-0";
    return "beevy-info-background-" + opacity + "-0";
  }

}
