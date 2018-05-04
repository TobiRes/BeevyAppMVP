import {BeevyEvent} from "./event.model";

export interface User {
  name: string;
  userID: string;
  mail: string;
  token?: string;
  events?: UserEvents;
}

export interface Admin {
  name: string;
  userID: string;
  mail: string;
}

export interface UserEvents {
  joinedEvents?: BeevyEvent[];
  createdEvents?: BeevyEvent[];
}

