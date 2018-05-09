import {BeevyEvent} from "./event.model";

export interface User {
  username: string;
  userID: string;
  mail: string;
  token?: string;
  joinedEvents?: BeevyEvent[];
  createdEvents?: BeevyEvent[];
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

