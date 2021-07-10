import { Period, ValueType } from '../types';
import { Invoice } from '../../../services/invoices/InvoicesService';
import { DateHelper } from '../../../lib/common/DateHelper';

const dateFormatterConfig = {
  [Period.Monthly]: DateHelper.getFirstDayOfMonth,
  [Period.Weekly]: DateHelper.getFirstDayOfWeek,
};

export const InvoicesHelper = {
  formatDataByPeriod: (
    data: Invoice[],
    filters: { period: Period, valueType: ValueType }
  ): { [date: string]: number } => {
    return data.reduce<{[date: string]: number}>((acc, curr) => {
      const dateFormatter = dateFormatterConfig[filters.period];
      const date = dateFormatter(curr.date);
      const stringDate = date.toISOString();
      const value = filters.valueType === ValueType.Revenues ? curr.total_invoice : curr.total_margin;
      acc[stringDate] = (acc[stringDate] ?? 0) + value;
      return acc;
    }, {})
  },
  getOrderedDates: (
    data: { [date: string]: number }
  ): string[] => {
   return Object.keys(data).sort((a, b) => a > b ? 1 : -1);
  },
  calculateCumulativeData: (
    orderedDates: string[],
    invoicesByDate: { [date: string]: number }
  ): { date: string, value: number }[] => {
    return orderedDates.reduce<{date: string, value: number}[]>((acc, date, index) => {
      let value = invoicesByDate[date];
      if (index) {
        const prevValue = acc[index - 1].value;
        value = value + prevValue;
      }
      acc.push({ date, value });
      return acc;
    }, []);
  },
  prepareData: (
    data: Invoice[],
    filters: { period: Period, valueType: ValueType }
  ): { date: string; value: number }[] => {
    const invoicesByDate = InvoicesHelper.formatDataByPeriod(data, filters);
    const orderedDates = InvoicesHelper.getOrderedDates(invoicesByDate);
    return InvoicesHelper.calculateCumulativeData(orderedDates, invoicesByDate)
  },
};
