import { useEffect, useMemo, useState } from 'react';

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

  useEffect(() => {
    InvoicesService.getInvoices().then(setData);
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
      <div className="Invoices-filters">
        <Switcher onChangeHandler={setPeriodFilter} activeItem={periodFilter} items={Object.values(Period)} />
        <Switcher onChangeHandler={setValueTypeFilter} activeItem={valueTypeFilter} items={Object.values(ValueType)} />
      </div>
      <Report title="Monthly Cumulative Invoices Revenues" type={ReportType.Line} data={tData} />
    </div>
  )
}

export default Invoices;
