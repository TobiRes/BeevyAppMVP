import {BeevyEvent} from "../models/event.model";
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Injectable} from "@angular/core";

@Injectable()
export class BeevyEventService {

  private static BEEVY_SERVER_URL = "http://localhost:8080/beevy/event";

  constructor(private http: HttpClient) {
  }

  getBeevyEvents(): Promise<BeevyEvent[]>{
    return new Promise((resolve => {
      this.http.get(BeevyEventService.BEEVY_SERVER_URL)
        .subscribe((existingEvents: BeevyEvent[]) => {
          console.log(existingEvents)
          resolve(existingEvents);
        })
    }))
  }
}
