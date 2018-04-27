import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BeevyEvent} from "../../models/event.model";
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

  changeColorOfInfoContainer(): string {
    return "beevy-info-background-transparent-1";
  }

  changeColorOfInfoSubContainer(): string {
    return "beevy-info-background-full-1";
  }
}
