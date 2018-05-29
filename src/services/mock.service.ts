import {Injectable} from "@angular/core";
import {BeevyEvent, BeevyEventType} from "../models/event.model";
import {Address} from "../models/address.model";
import {Storage} from "@ionic/storage";

@Injectable()
export class MockService {

  constructor(private storage: Storage) {
  }

  checkIfUserExists() {
    return this.storage.get("user");
  }

  getMockEvent(i: number): BeevyEvent {
    let address: Address = {
      street: "Weingartenstraße 10",
      zip: 77654,
      city: "Offenburg"
    }

    let event1 = {
      admin: {
        username: "clara",
        userID: "1234"
      },
      title: "Sketch Night",
      summary: "Sketch & Chill bei Clara",
      description: "Chilliger Abend mit Essen und zeichnen. Freu mich auf euch!",
      type: BeevyEventType.hangout,
      date: new Date(2018, 6, 4, 10, 20, 0, 0),
      eventID: "12345",
      address: address,
      registeredMembers: [],
      possibleMemberCount: 7,
      currentMemberCount: 0,
      tags: ["Kunst", "Fußball", "Sport", "Aktivität", "Energie", "Pflanzen"]
    }
    let address2: Address = {
      street: "Am Osterbach 26",
      zip: 77654,
      city: "Offenburg"
    }

    let event2 = {
      admin: {
        username: "tobi",
        userID: "5678"
      },
      title: "Zock-Projekt",
      summary: "Eine Woche Spiele testen",
      description: "Wir testen eine Woche lang verschiedene Spiele und machen eine Hausarbeit",
      type: BeevyEventType.project,
      date: new Date(2018, 7, 17, 20, 15, 0, 0),
      address: address2,
      registeredMembers: [],
      possibleMemberCount: 7,
      eventID: "12346",
      currentMemberCount: 0,
      tags: ["Bar", "Feiern", "Musik"]
    }

    let address3: Address = {
      street: "Weingartenstraße 10",
      zip: 77654,
      city: "Kehl"
    }

    let event3 = {
      admin: {
        username: "clara",
        userID: "1234"
      },
      title: "Klettern",
      summary: "Wir klettern einen Hang hinauf",
      description: "Chilliger Abend mit Essen und zeichnen. Freu mich auf euch!",
      type: BeevyEventType.activity,
      date: new Date(2018, 9, 13, 9, 30, 0, 0),
      address: address3,
      registeredMembers: [],
      possibleMemberCount: 7,
      eventID: "12347",
      currentMemberCount: 0,
      tags: ["Fotografie"]
    }

    let address4: Address = {
      street: "Weingartenstraße 10",
      zip: 77654,
      city: "Kehl"
    }

    let event4 = {
      admin: {
        username: "clara",
        userID: "1234"
      },
      title: "Malen",
      summary: "Wir malen was zusammen",
      description: "Chilliger Abend mit Essen und zeichnen. Freu mich auf euch!",
      type: BeevyEventType.activity,
      date: new Date(2018, 11, 28, 9, 30, 0, 0),
      address: address4,
      registeredMembers: [],
      eventID: "12348",
      possibleMemberCount: 7,
      currentMemberCount: 0,
      tags: ["Malen"]
    }
    let address5: Address = {
      street: "Wilhelmsstraße 10",
      zip: 77654,
      city: "Dußlingen"
    }

    let event5 = {
      admin: {
        username: "clara",
        userID: "1234"
      },
      title: "Barabend",
      summary: "Wir trinken was zusammen",
      description: "Chilliger Abend mit Essen und zeichnen. Freu mich auf euch!",
      type: BeevyEventType.hangout,
      date: new Date(2018, 11, 30, 9, 30, 0, 0),
      address: address5,
      registeredMembers: [],
      possibleMemberCount: 7,
      eventID: "123459",
      currentMemberCount: 0,
      tags: ["Malen"]
    }

    /*let random: number = Math.floor(Math.random() * 3 + 1);
    if (random == 1)
      return event1;
    if (random == 2)
      return event2;
    return event3*/
    if(i==1) return event1;
    if(i==2) return event2;
    if(i==3) return event3;
    if(i==4) return event4;
    if(i==5) return event5;
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
