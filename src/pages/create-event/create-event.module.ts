import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {CreateEventPage} from "./create-event";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    CreateEventPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateEventPage),
    ComponentsModule
  ],
})
export class CreateEventPageModule {
}
