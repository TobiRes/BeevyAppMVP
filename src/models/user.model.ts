import {BeevyEvent} from "./event.model";

export interface User {
  username: string;
  userID: string;
  mail: string;
  token?: string;
  userEvents?: UserEvents;
  currentAvatar?: string;
}

export interface UnregisteredUser {
  username: string;
  userID: string;
  mail: string;
  currentAvatar: string;
}


export interface UserEvents {
  joinedEvents: BeevyEvent[];
  createdEvents: BeevyEvent[];
}


