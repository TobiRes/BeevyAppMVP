import {BeevyEvent, JoinEventData, ReportData} from "../models/event.model";
import {HttpClient} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {AppConfig} from "../config/app-config";
import {Storage} from "@ionic/storage";
import {User} from "../models/user.model";
import {UserService} from "./user.service";
import {RequestOptions} from "@angular/http";

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


  leaveBeevyEvent(eventID: string, user: User){
    console.log(user.username+" has left "+eventID);
  }


  deleteBeevyEvent(eventID: string, user: User){
    return new Promise((resolve, reject) => {
      this.storage.get("user")
        .then((user: User) => {
          if (!user || !(user.userID && user.token)) {
            console.log("Can't delete event", user);
          } else {
            this.handleDeletingOnServerSide(eventID, user)
              .then(() => {
                this.userService.getUserEvents(user);
                resolve();
              })
          }
        })
        .catch(err => reject(err))
    })
  }

  private handleDeletingOnServerSide(eventID: string, user: User) {
    let deleteEventData: JoinEventData = {
      userID: user.userID,
      token: user.token,
      eventID: eventID
    };
    return new Promise((resolve, reject) => {
      this.http.post(BeevyEventService.BEEVY_EVENT_BASE_URL + "/delete", deleteEventData)
        .subscribe(() => {
          console.log("deleted event");
          resolve();
        }, (err) => reject(err));
    })
  }

  reportEvent(eventID: string, user: User, reason: string){
    console.log(user.username+" will "+ eventID+" melden, weil "+reason);
    this.storage.get("user")
      .then((user: User) => {
        if (!user || !(user.userID && user.token)) {
          console.log("Can't report event", user);
        } else {
          this.handleReportingOnServerSide(eventID, user, reason)
            .then(() => this.userService.getUserEvents(user))
        }
      })
      .catch(err => console.error(err))
  }

  private handleReportingOnServerSide(eventID: string, user: User, reason: string) {
    let reportData: ReportData = {
      userID: user.userID,
      token: user.token,
      eventID: eventID,
      reason: reason
    };
    return new Promise((resolve, reject) => {
      this.http.post(BeevyEventService.BEEVY_EVENT_BASE_URL + "/report", reportData)
        .subscribe(() => {
          resolve();
        }, (err) => reject(err));
    })
  }


}
