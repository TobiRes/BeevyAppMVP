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

  openEventView() {
    this.clicked.emit(this.beevyEvent);
  }

  getDate(date: Date): string {
    return DateUtil.getWeekday(new Date(date).getDay()) + " " + DateUtil.getDayMonthOfDate(date);
  }

  getTime(date: Date): string {
    let oldTime = DateUtil.getTime(date);
    let newTime: string;
    if (oldTime.length == 4) {
      if (oldTime.charAt(1) == ":") {
        newTime = "0" + oldTime;
        console.log(newTime);
        return newTime;
      } else {
        newTime = oldTime.substring(0, 3) + "0" + oldTime.substring(3, 5);
        console.log(newTime);
        return newTime;
      }
    }
    if (oldTime.length == 3) {
      newTime = "0" + oldTime.substring(0, 2) + "0" + oldTime.substring(2, 4);
      console.log(newTime);
      return newTime;
    }
    return DateUtil.getTime(date);
  }

  changeColorOfContainer(type: BeevyEventType, opacity: string): string {
    if (type == BeevyEventType.activity) return "beevy-info-background-" + opacity + "-1";
    if (type == BeevyEventType.hangout) return "beevy-info-background-" + opacity + "-2";
    if (type == BeevyEventType.project) return "beevy-info-background-" + opacity + "-0";
    return "beevy-info-background-" + opacity + "-0";
  }
}
