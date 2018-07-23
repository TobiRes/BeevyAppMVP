import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {FilterModalPage} from './filter-modal';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    FilterModalPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterModalPage),
    ComponentsModule
  ],
})
export class FilterModalPageModule {
}
