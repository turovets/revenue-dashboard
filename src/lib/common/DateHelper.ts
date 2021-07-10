export type TDateLike = Date | string | number;

export enum DayOfWeek {
  Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday,
}

export class DateHelper {
  protected static dayByMonth = [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334 ];

  static parse(fValue: TDateLike): Date {
    if (fValue instanceof Date)
      return fValue;
    const tValue = new Date(fValue);
    if (typeof fValue === 'string' && fValue.length === 10) { // 'YYYY-MM-DD'.length
      tValue.setFullYear(tValue.getUTCFullYear(), tValue.getUTCMonth(), tValue.getUTCDate());
      tValue.setHours(0, 0, 0, 0);
    }
    return tValue;
  }

  static getFirstDayOfMonth(value: TDateLike): Date {
    const date = new Date(value);
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  static getFirstDayOfWeek(value: TDateLike, firstDay: DayOfWeek = DayOfWeek.Monday): Date {
    const date = DateHelper.parse(value);
    const day = date.getDay();
    if (firstDay === day) {
      return date;
    }
    let shift = firstDay - date.getDay();
    const result = new Date(date);
    result.setDate(date.getDate() + (shift < 0 ? shift : shift - 7));
    return result;
  }

  static formatDateToString(date: TDateLike): string {
   return date instanceof Date ? date.toLocaleDateString() : (new Date(date)).toLocaleDateString();
  }
}
