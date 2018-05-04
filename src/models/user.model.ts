import {BeevyEvent} from "./event.model";

export interface User {
  name: string;
  userID: string;
  token: string;
  userProfile: Profile;
}

export interface Admin {
  name: string;
  userID: string;
  mail: string;
}

export interface Profile {
  joinedEvents?: BeevyEvent[];
  createdEvents?: BeevyEvent[];
  mail: string;
}

