export class DateTimeHelper {
  static convertDate(str: string): string {
    const date = new Date(str),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, month, date.getFullYear()].join("/");
  }
}
