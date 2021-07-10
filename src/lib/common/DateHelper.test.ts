import { DateHelper, DayOfWeek } from './DateHelper';

describe('lib/common/DateHelper', () => {
  describe('.getFirstDayOfWeekDate(value)', () => {
    it(' - should return the first day date of the week', () => {
      const values: Array<[Date]> = [
        [ new Date(2020, 11, 28) ],
        [ new Date(2020, 11, 29) ],
        [ new Date(2020, 11, 30) ],
        [ new Date(2020, 11, 31) ],
        [ new Date(2021, 0,  1), ],
        [ new Date(2021, 0,  2), ],
        [ new Date(2021, 0,  3), ],
      ];
      for (const value of values) {
        const result = DateHelper.getFirstDayOfWeek(value[0]);
        expect(result).toBeInstanceOf(Date);
        expect(result.getFullYear()).toBe(2020);
        expect(result.getMonth()).toBe(11);
        expect(result.getDate()).toBe(28);
      }
    });
    it(' - should return the first day date of the week for the max value of a day of week', () => {
      const values: Array<[Date]> = [
        [ new Date(2020, 11, 26) ],
        [ new Date(2020, 11, 27) ],
        [ new Date(2020, 11, 28) ],
        [ new Date(2020, 11, 29) ],
        [ new Date(2020, 11, 30) ],
        [ new Date(2020, 11, 31) ],
        [ new Date(2021, 0,  1),  ],
      ];
      for (const value of values) {
        const result = DateHelper.getFirstDayOfWeek(value[0], DayOfWeek.Saturday);
        expect(result).toBeInstanceOf(Date);
        expect(result.getFullYear()).toBe(2020);
        expect(result.getMonth()).toBe(11);
        expect(result.getDate()).toBe(26);
      }
    });
  });

  describe('.getFirstDayOfMonthDate(value)', () => {
    it(' - should return the first day date of the month', () => {
      const values: Array<[Date, Date]> = [
        [ new Date(2021, 11, 28), new Date(2021, 11, 1) ],
        [ new Date(2021, 12, 29), new Date(2021, 12, 1) ],
      ];
      for (const value of values) {
        const result = DateHelper.getFirstDayOfMonth(value[0]);
        expect(result).toBeInstanceOf(Date);
        expect(result).toStrictEqual(value[1]);
      }
    });
  });
});
