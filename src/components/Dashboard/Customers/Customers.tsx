import { useEffect, useMemo, useState } from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';

import { CustomerRevenue, CustomersService } from '../../../services/customers/CustomersService';
import { ValueType } from '../types';
import Switcher from '../../shared/Switcher';
import { TableColumn } from '../../shared/Table/Table';
import Report, {ReportType} from '../../Report/Report';

const Customers = () => {
  const [data, setData] = useState<CustomerRevenue[]>([]);
  const [valueTypeFilter, setValueTypeFilter] = useState<ValueType>(ValueType.Revenues);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    CustomersService.getCustomersRevenues().then((res) => {
      setData(res);
      setIsLoading(false);
    }).catch(console.log);
  }, [])

  const rows = useMemo(() => {
    return [...data].sort((a, b) => {
      if (valueTypeFilter === ValueType.Revenues) {
        return a.total_revenue < b.total_revenue ? 1 : -1;
      } else {
        return a.total_margin < b.total_margin ? 1 : -1;
      }
    }).map((i) => ({
      name: i.customer_name,
      invoicesNumber: i.invoices_count,
      total: valueTypeFilter === ValueType.Revenues ? i.total_revenue : i.total_margin
    }))
  }, [data, valueTypeFilter])

  const columns: TableColumn[] = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'invoicesNumber', align: 'center', label: 'Invoices Number', minWidth: 100 },
    {
      id: 'total',
      label: valueTypeFilter === ValueType.Revenues ? 'Total Revenue' : 'Total Margin',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
  ];

  return (
    <div className="Dashboard-component-wrapper">
      {isLoading && <LinearProgress className="Dashboard-progress" />}
      <div className="Dashboard-filters">
        <Switcher onChangeHandler={setValueTypeFilter} activeItem={valueTypeFilter} items={Object.values(ValueType)} disabled={isLoading} /><div/>
      </div>
      {/*<h3 className="Dashboard-component-title"></h3>*/}
      {/*<Table rows={rows} columns={columns} />*/}
      <Report title="Our Best Customers" type={ReportType.Table} data={{ columns, rows }} />
    </div>
  )
}

export default Customers;
