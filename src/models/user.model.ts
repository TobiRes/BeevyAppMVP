import {BeevyEvent} from "./event.model";

export interface User {
  username: string;
  userID: string;
  mail: string;
  token?: string;
  userEvents?: UserEvents;
}

export interface UnregisteredUser {
  username: string;
  userID: string;
  mail: string;
}


export interface UserEvents {
  joinedEvents: BeevyEvent[];
  createdEvents: BeevyEvent[];
}


