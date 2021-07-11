import { ReportSelectedFilter } from '../../Report/ReportBuilder';
import { CustomerRevenue} from '../../../services/customers/CustomersService';
import { ValueType } from '../types';
import { StickyHeadTableProps, TableColumn } from '../../shared/Table/Table';

export const CustomerDataHelper = {
  transformData: (data: CustomerRevenue[], filters: ReportSelectedFilter): StickyHeadTableProps => {
    const rows = [...data].sort((a, b) => {
      if (filters.valueType === ValueType.Revenues) {
        return a.total_revenue < b.total_revenue ? 1 : -1;
      } else {
        return a.total_margin < b.total_margin ? 1 : -1;
      }
    }).map((i) => ({
      name: i.customer_name,
      invoicesNumber: i.invoices_count,
      total: filters.valueType === ValueType.Revenues ? i.total_revenue : i.total_margin
    }))

    const columns: TableColumn[] = [
      { id: 'name', label: 'Name' },
      { id: 'invoicesNumber', align: 'center', label: 'Invoices Number' },
      {
        id: 'total',
        label: filters.valueType === ValueType.Revenues ? 'Total Revenue' : 'Total Margin',
        align: 'right',
        format: (value) => value.toFixed(2),
      },
    ];
    return { rows, columns }
  },
}
