export class DateUtil {

  static getDayMonthYearOfDate(date: Date): string{
    return date.getDate() + "/" + (date.getMonth() + 1).toString() + "/" + (date.getFullYear().toString().substr(-2));
  }
}
