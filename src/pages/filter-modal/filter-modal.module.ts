import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterModalPage } from './filter-modal';
import {RlTagInputModule} from 'angular2-tag-input';

@NgModule({
  declarations: [
    FilterModalPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterModalPage),
    RlTagInputModule
  ],
})
export class FilterModalPageModule {}
