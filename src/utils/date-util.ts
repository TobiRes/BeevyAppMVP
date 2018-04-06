export class DateUtil {

  static getDayMonthYearOfDate(date): string{
    if(typeof date == "string"){
      date = new Date(date);
    }
    return date.getDate() + "/" + (date.getMonth() + 1).toString() + "/" + (date.getFullYear().toString().substr(-2));
  }
}
