import {Address} from "./address.model";
import {EventComment} from "./comment.model";

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
  comments?: EventComment[];
}

export interface Admin {
  username: string;
  userID: string;
  token?: string;
  avatar?: string;
}

export interface JoinEventData {
  userID: string;
  eventID: string;
  token: string;
}

export interface ReportData {
  userID: string;
  eventID: string;
  token: string;
  reason: string;
}

export enum BeevyEventType {
  activity = <any> "activity",
  project = <any> "project",
  hangout = <any> "hangout"
}
