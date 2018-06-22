import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {CreateEventPage} from "./create-event";
import {RlTagInputModule} from "angular2-tag-input/dist";

@NgModule({
  declarations: [
    CreateEventPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateEventPage),
    RlTagInputModule
  ],
})
export class CreateEventPageModule {
}
