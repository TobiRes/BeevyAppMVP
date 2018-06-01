import {BeevyEvent, JoinEventData} from "../models/event.model";
import {HttpClient} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {AppConfig} from "../config/app-config";
import {Storage} from "@ionic/storage";
import {User} from "../models/user.model";
import {UserService} from "./user.service";

@Injectable()
export class BeevyEventService {

  private static BEEVY_EVENT_BASE_URL = AppConfig.API_BASE_URL + "/event";

  constructor(private http: HttpClient,
              private storage: Storage,
              private userService: UserService) {
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
        if (!user || !(user.userID && user.token)) {
          console.log("Can't join event", user);
        } else {
          this.handleJoiningOnServerSide(beevent, user)
            .then(() => this.userService.getUserEvents(user))
        }
      })
      .catch(err => console.error(err))
  }

  private handleJoiningOnServerSide(beevent: BeevyEvent, user: User) {
    let joinEventData: JoinEventData = {
      userID: user.userID,
      token: user.token,
      eventID: beevent.eventID
    };
    return new Promise((resolve, reject) => {
      this.http.post(BeevyEventService.BEEVY_EVENT_BASE_URL + "/join", joinEventData)
        .subscribe(() => {
          console.log("joined event");
          resolve();
        }, (err) => reject(err));
    })
  }
}
