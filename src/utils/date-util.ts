export class DateUtil {

  static getDayMonthYearOfDate(date: Date): string {
    if (typeof date == "string") {
      date = new Date(date);
    }
    return this.getWeekday(date.getDay()) + " " + date.getDate() + "." + (date.getMonth() + 1).toString();
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
}
