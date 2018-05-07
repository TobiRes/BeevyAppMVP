import {Injectable} from "@angular/core";
import {BeevyEvent, BeevyEventType} from "../models/event.model";
import {Address} from "../models/address.model";
import {Admin, UserEvents} from "../models/user.model";
import {Storage} from "@ionic/storage";

@Injectable()
export class MockService {

  constructor(private storage: Storage) {
  }

  checkIfUserExists() {
    return this.storage.get("user");
  }

  getMockEvent(): BeevyEvent {
    let clara: Admin = {
      name: "Clara",
      userID: "123",
      mail: "cdeitmar@stud.hs-offenburg.de"
    }
    let address: Address = {
      street: "Weingartenstraße 10",
      zip: 77654,
      city: "Offenburg"
    }

    let event1 = {
      admin: clara,
      title: "Sketch Night",
      summary: "Sketch & Chill bei Clara",
      description: "Chilliger Abend mit Essen und zeichnen. Freu mich auf euch!",
      type: BeevyEventType.hangout,
      date: new Date(2018, 3, 4, 10, 20, 0, 0),
      address: address,
      registeredMembers: [],
      possibleMemberCount: 7,
      currentMemberCount: 0
    }
    let tobi: Admin = {
      name: "Tobi",
      userID: "456",
      mail: "treski@stud.hs-offenburg.de"
    }
    let address2: Address = {
      street: "Am Osterbach 26",
      zip: 77654,
      city: "Offenburg"
    }

    let event2 = {
      admin: tobi,
      title: "Zock-Projekt",
      summary: "Eine Woche Spiele testen",
      description: "Wir testen eine Woche lang verschiedene Spiele und machen eine Hausarbeit",
      type: BeevyEventType.project,
      date: new Date(2018, 4, 17, 20, 15, 0, 0),
      address: address2,
      registeredMembers: [],
      possibleMemberCount: 7,
      currentMemberCount: 0
    }

    let address3: Address = {
      street: "Weingartenstraße 10",
      zip: 77654,
      city: "Kehl"
    }

    let event3 = {
      admin: clara,
      title: "Klettern",
      summary: "Wir klettern einen Hang hinauf",
      description: "Chilliger Abend mit Essen und zeichnen. Freu mich auf euch!",
      type: BeevyEventType.event,
      date: new Date(2018, 11, 30, 9, 30, 0, 0),
      address: address3,
      registeredMembers: [],
      possibleMemberCount: 7,
      currentMemberCount: 0
    }

    let random: number = Math.floor(Math.random() * 3 + 1);
    if (random == 1)
      return event1;
    if (random == 2)
      return event2;
    return event3
  }

  createMockUser() {
    let mockUser = {
      name: "Leon",
      token: "abcdefg",
      userID: "testID",
      mail: "lschimpf@stud.hs-offenburg.de",
    }
    return this.storage.set("user", mockUser);
  }
}
