import {BeevyEvent} from "../models/event.model";
import {HttpClient} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {AppConfig} from "../config/app-config";

@Injectable()
export class BeevyEventService {

  private static BEEVY_EVENT_BASE_URL = AppConfig.API_BASE_URL + "/event";

  constructor(private http: HttpClient) {
  }

  getBeevyEvents(): Promise<BeevyEvent[]> {
    return new Promise((resolve => {
      this.http.get(BeevyEventService.BEEVY_EVENT_BASE_URL)
        .subscribe((existingEvents: BeevyEvent[]) => {
          console.log(existingEvents)
          resolve(existingEvents);
        })
    }))
  }

  createBeevyEvents(beevent: BeevyEvent) {
    return this.http.post(BeevyEventService.BEEVY_EVENT_BASE_URL + "/create", beevent);
  }
}
