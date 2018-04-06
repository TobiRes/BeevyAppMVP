import {BeevyEvent} from "./event.model";

export interface User {
  name: string;
  userID: string;
  userProfile: Profile;
}

export interface Profile {
  joinedEvents?: BeevyEvent[];
  createdEvents?: BeevyEvent[];
  mail: string;
  token: string;
}

