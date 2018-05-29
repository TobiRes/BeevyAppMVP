import {NgModule} from '@angular/core';
import {BeevyEventComponent} from './beevy-event/beevy-event';
import {IonicModule} from "ionic-angular";
import { PopoverComponent } from './popover/popover';

@NgModule({
  declarations: [BeevyEventComponent],
  imports: [IonicModule],
  exports: [BeevyEventComponent]
})
export class ComponentsModule {
}
