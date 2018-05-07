import {Address} from "./address.model";

export interface BeevyEvent {
  eventID?: string;
  admin: string;
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

export enum BeevyEventType {
  event = <any> "event",
  project = <any> "project",
  hangout = <any> "hangout"
}
