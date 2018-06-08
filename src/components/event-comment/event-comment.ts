import { Component } from '@angular/core';

@Component({
  selector: 'event-comment',
  templateUrl: 'event-comment.html'
})
export class EventCommentComponent {

  text: string;

  constructor() {
    console.log('Hello EventCommentComponent Component');
    this.text = 'Hello World';
  }

}
