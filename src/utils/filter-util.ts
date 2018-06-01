import {BeevyEventType} from "../models/event.model";

export class FilterUtil {

  static eventDoesNotContainSearchString(searchInput: string, eventString: string): boolean {
    return (searchInput != "" && (eventString.indexOf(searchInput.toLowerCase()) == -1));
  }

  static eventDateIsBeforeOrAfterSpecifiedFilterDate(eventDate, earliestDate: string, lastDate: string): boolean {
    //eventDate type not specified because of JS sometimes using date as strings
    return (new Date(eventDate).toISOString() < earliestDate || new Date(eventDate).toISOString() > lastDate);
  }

  static eventIsInDifferentCity(filterCity: string, eventCity: string): boolean {
    return (filterCity != "" && eventCity.toLowerCase() != filterCity.toLowerCase());
  }

  static eventTypeDoesNotMatchFilteredEventTypes(filterType: boolean[], eventType: BeevyEventType): boolean {
    let currentMatchStatus: boolean = false;
    if (filterType[0] == false && eventType == BeevyEventType.project) currentMatchStatus = true;
    if (filterType[1] == false && eventType == BeevyEventType.activity) currentMatchStatus = true;
    if (filterType[2] == false && eventType == BeevyEventType.hangout) currentMatchStatus = true;
    return currentMatchStatus;
  }
}
