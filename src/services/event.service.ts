import {BeevyEvent} from "../models/event.model";
import {HttpClient} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {AppConfig} from "../config/app-config";
import {Storage} from "@ionic/storage";
import {User} from "../models/user.model";

@Injectable()
export class BeevyEventService {

  private static BEEVY_EVENT_BASE_URL = AppConfig.API_BASE_URL + "/event";

  constructor(private http: HttpClient, private storage: Storage) {
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

  joinBeevyEvent(beevent: BeevyEvent) {
    this.storage.get("user")
      .then((user: User) => {
        if(!user || !(user.userID && user.token)){
          console.log("Can't join event", user);
        } else {
          this.alertServerOfJoin(beevent, user)
        }
      })
      .catch(err => console.error(err))
  }

  private alertServerOfJoin(beevent: BeevyEvent, user: User) {
    let joinEventData = {
      userID: user.userID,
      token: user.token,
      eventID: beevent.eventID
    };
    this.http.post(BeevyEventService.BEEVY_EVENT_BASE_URL + "/join", joinEventData)
      .subscribe(() => {
        console.log("joined event");
      })
  }
}
