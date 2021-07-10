import { useEffect, useState } from 'react';
import { Invoice, InvoicesService } from '../../../services/invoices/InvoicesService';
import { Period, ValueType } from '../types';
import Report, { ReportType } from '../../Report/Report';
import Switcher from '../../shared/Switcher/Switcher';

const Invoices = () => {
  const [data, setData] = useState<Invoice[]>([]);
  const [periodFilter, setPeriodFilter] = useState<Period>(Period.Monthly);
  const [valueTypeFilter, setValueTypeFilter] = useState<ValueType>(ValueType.Revenues);

  useEffect(() => {
    InvoicesService.getInvoices().then(setData);
  }, [])

  const tData = data.map((i) => ({
    date: i.date,
    value: valueTypeFilter === ValueType.Revenues ? i.total_invoice : i.total_margin,
  }))

  return (
    <>
      <Switcher onChangeHandler={setPeriodFilter} activeItem={periodFilter} items={Object.values(Period)} />
      <Switcher onChangeHandler={setValueTypeFilter} activeItem={valueTypeFilter} items={Object.values(ValueType)} />
      <Report title="Invoices Line Chart" type={ReportType.Line} data={tData} />
    </>
  )
}

export default Invoices;
