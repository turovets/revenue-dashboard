import { useEffect, useMemo, useState } from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';

import './Invoices.scss';
import { Invoice, InvoicesService } from '../../../services/invoices/InvoicesService';
import { Period, ValueType } from '../types';
import Report, { ReportType } from '../../Report/Report';
import Switcher from '../../shared/Switcher/Switcher';
import { InvoicesHelper } from './helper';

const Invoices = () => {
  const [data, setData] = useState<Invoice[]>([]);
  const [periodFilter, setPeriodFilter] = useState<Period>(Period.Monthly);
  const [valueTypeFilter, setValueTypeFilter] = useState<ValueType>(ValueType.Revenues);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    InvoicesService.getInvoices().then((res) => {
      setData(res);
      setIsLoading(false);
    }).catch(console.log);
  }, [])

  const tData = useMemo(() => {
   const cumulativeData = InvoicesHelper.prepareData(data, { period: periodFilter, valueType: valueTypeFilter });
   return cumulativeData.reduce<{ x: Date[], y: number[] }>((acc, curr) => {
     acc.x.push(new Date(curr.date));
     acc.y.push(curr.value);
     return acc;
   }, { x: [], y: [] })
  }, [data, periodFilter, valueTypeFilter])

  return (
    <div className="Invoices-root">
      {isLoading && <LinearProgress className="Dashboard-progress" />}
      <div className="Dashboard-filters">
        <Switcher onChangeHandler={setPeriodFilter} activeItem={periodFilter} items={Object.values(Period)} disabled={isLoading} />
        <Switcher onChangeHandler={setValueTypeFilter} activeItem={valueTypeFilter} items={Object.values(ValueType)} disabled={isLoading} />
      </div>
      <Report title="Monthly Cumulative Invoices Revenues" type={ReportType.Line} data={tData} />
    </div>
  )
}

export default Invoices;
