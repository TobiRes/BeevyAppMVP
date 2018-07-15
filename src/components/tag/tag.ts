import {Component, Input} from '@angular/core';

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

  @Input()
  tagText: String;

  constructor() {
  }

}
