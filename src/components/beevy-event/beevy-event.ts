import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BeevyEvent, BeevyEventType} from "../../models/event.model";
import {DateUtil} from "../../utils/date-util";
import {NavController} from "ionic-angular";

@Component({
  selector: 'beevy-event',
  templateUrl: 'beevy-event.html'
})
export class BeevyEventComponent {

  @Input()
  beevyEvent: BeevyEvent;

  @Output()
  clicked = new EventEmitter();

  constructor(private navCtrl: NavController) {
  }

  openEventView(){
    this.clicked.emit(this.beevyEvent);
  }

  getDate(date: Date): string {
    return DateUtil.getDayMonthYearOfDate(date);
  }
  getTime(date: Date): string {
    return DateUtil.getTime(date);
  }

  changeColorOfContainer(type: BeevyEventType, opacity: string): string {
    if(type == BeevyEventType.event) return "beevy-info-background-" + opacity +"-0";
    if(type == BeevyEventType.hangout) return "beevy-info-background-" + opacity +"-1";
    if(type == BeevyEventType.project) return "beevy-info-background-" + opacity +"-2";
    return "beevy-info-background-"+opacity+"-0";
  }

  changeColorOfInfoSubContainer(): string {
    return "beevy-info-background-full-1";
  }
}
