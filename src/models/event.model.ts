import {Admin, User} from "./user.model";
import {Address} from "./address.model";

export interface BeevyEvent {
  admin: Admin;
  title: string;
  summary: string;
  description: string;
  type: BeevyEventType;
  date: Date;
  endDate?: Date;
  address: Address;
  registeredMembers?: User[];
  possibleMemberCount: number;
  currentMemberCount?: number;
}

export enum BeevyEventType {
  event = <any> "Event",
  project = <any> "Project"
}
