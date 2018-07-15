import { Component } from '@angular/core';

/**
 * Generated class for the TagComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tag',
  templateUrl: 'tag.html'
})
export class TagComponent {

  tagText: string;

  constructor() {
    console.log('Hello TagComponent Component');
    this.tagText = 'Hello World';
  }

}
