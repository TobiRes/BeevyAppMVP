import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OptionsModalPage } from './options-modal';

@NgModule({
  declarations: [
    OptionsModalPage,
  ],
  imports: [
    IonicPageModule.forChild(OptionsModalPage),
  ],
})
export class OptionsModalPageModule {}
