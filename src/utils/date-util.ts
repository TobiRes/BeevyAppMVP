export class DateUtil {

  static getDayMonthOfDate(date: Date): string {
    if (typeof date == "string") {
      date = new Date(date);
    }
    return date.getDate() + "." + (date.getMonth() + 1).toString();
  }
  static getDayMonthYearOfDate(date: Date): string {
    if (typeof date == "string") {
      date = new Date(date);
    }
    return date.getDate() + "." + (date.getMonth() + 1).toString()+"."+ date.getFullYear();
  }

  static getTime(date: Date): string {
    if (typeof date == "string") {
      date = new Date(date);
    }
    return date.getHours().toString() + ":" + date.getMinutes().toString();
  }

  static getWeekday(dayOfWeek: number): string {
    let weekday: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return weekday[dayOfWeek];
  }
  static getWeekdayfull(dayOfWeek: number): string {
    let weekday: string[] = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    return weekday[dayOfWeek];
  }

}
