import {Address} from "./address.model";

export interface BeevyEvent {
  eventID?: string;
  admin: Admin;
  title: string;
  summary: string;
  description: string;
  type: BeevyEventType;
  date: Date;
  endDate?: Date;
  address: Address;
  registeredMembers?: string[];
  possibleMemberCount: number;
  currentMemberCount?: number;
  tags?: string[];
}

export interface Admin {
  username: string;
  userID: string;
  token?: string;
}

export interface JoinEventData {
  userID: string;
  eventID: string;
  token: string;
}

export enum BeevyEventType {
  activity = <any> "activity",
  project = <any> "project",
  hangout = <any> "hangout"
}
