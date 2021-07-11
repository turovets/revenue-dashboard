import { Invoice } from '../../../services/invoices/InvoicesService';
import { ReportSelectedFilter } from '../../Report/ReportBuilder';
import { InvoicesHelper } from './helper';
import { ValueType } from '../types';
import { StickyHeadTableProps, TableColumn } from '../../shared/Table/Table';
import { DateHelper } from '../../../lib/common/DateHelper';
import { LineChartProps } from '../../shared/charts/LineChart/LineChart';

export const InvoicesDataHelper = {
  transformDataToCumulative: (data: Invoice[], filters: ReportSelectedFilter): LineChartProps => {
    const cumulativeData = InvoicesHelper.prepareData(data, { period: filters.period!, valueType: filters.valueType! });
    return cumulativeData.reduce<{ x: Date[], y: number[] }>((acc, curr) => {
      acc.x.push(new Date(curr.date));
      acc.y.push(curr.value);
      return acc;
    }, { x: [], y: [] })
  },
  transformDataToLatest: (data: Invoice[], filters: ReportSelectedFilter): StickyHeadTableProps => {
    const LATEST_INVOICES_COUNT = 15;
    const rows = [...data].sort((a, b) => a.date < b.date ? 1 : -1)
      .map((i: Invoice) => ({
        date: i.date,
        name: i.customer_name,
        region: i.region,
        total: filters.valueType === ValueType.Revenues ? i.total_invoice : i.total_margin
      }))
      .slice(0, LATEST_INVOICES_COUNT)
    const columns: TableColumn[] = [
      { id: 'date', label: 'Date', format: (value) => DateHelper.formatDateToString(value) },
      { id: 'name', label: 'Customer Name' },
      { id: 'region', label: 'Region' },
      {
        id: 'total',
        label: filters.valueType === ValueType.Revenues ? 'Total Revenue' : 'Total Margin',
        align: 'right',
        format: (value) => value.toFixed(2),
      },
    ];
    return { rows, columns, noDataMsg: 'There are no invoices yet' }
  },
}
