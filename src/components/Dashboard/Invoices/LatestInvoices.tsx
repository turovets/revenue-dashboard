import React, { useCallback, useEffect, useMemo, useState } from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import './Invoices.scss';
import { Invoice, InvoicesService } from '../../../services/invoices/InvoicesService';
import {  ValueType } from '../types';
import Report, { ReportType } from '../../Report/Report';
import Switcher from '../../shared/Switcher/Switcher';
import { DateHelper } from '../../../lib/common/DateHelper';
import { TableColumn } from '../../shared/Table/Table';
import ReportsContainer from '../../Report/ReportsContainer';

const LATEST_INVOICES_COUNT = 15;

const Invoices = () => {
  const [data, setData] = useState<Invoice[]>([]);
  const [valueTypeFilter, setValueTypeFilter] = useState<ValueType>(ValueType.Revenues);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInvoicesDate, setSelectedInvoicesDate] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    InvoicesService.getInvoices().then((res) => {
      setData(res);
      setIsLoading(false);
    }).catch(console.log);
  }, [])

  const onInvoicesDateChange = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedInvoicesDate(event.target.value as string)
  }, []);

  const mapperCallback = (i: Invoice) => ({
    date: i.date,
    name: i.customer_name,
    region: i.region,
    total: valueTypeFilter === ValueType.Revenues ? i.total_invoice : i.total_margin
  });

  const latestRows = useMemo(() => {
    return [...data].sort((a, b) => a.date < b.date ? 1 : -1)
      .map(mapperCallback)
      .slice(0, LATEST_INVOICES_COUNT)
  }, [data, valueTypeFilter])

  const rows = useMemo(() => {
    return [...data]
      .filter((i) => i.date === selectedInvoicesDate)
      .map(mapperCallback)
  }, [data, valueTypeFilter, selectedInvoicesDate])

  const columns: TableColumn[] = [
    { id: 'date', label: 'Date', format: (value) => DateHelper.formatDateToString(value) },
    { id: 'name', label: 'Customer Name' },
    { id: 'region', label: 'Region' },
    {
      id: 'total',
      label: valueTypeFilter === ValueType.Revenues ? 'Total Revenue' : 'Total Margin',
      align: 'right',
      format: (value) => value.toFixed(2),
    },
  ];

  return (
    <div className="Dashboard-component-wrapper">
      {isLoading && <LinearProgress className="Dashboard-progress" />}
      <div className="Dashboard-filters">
        <Switcher onChangeHandler={setValueTypeFilter} activeItem={valueTypeFilter} items={Object.values(ValueType)} disabled={isLoading} /><div />
      </div>
      <ReportsContainer>
        <div><Report
          title="Latest Invoices"
          type={ReportType.Table}
          data={{
            columns,
            rows: latestRows,
            noDataMsg: 'There are no invoices yet'
          }}
        /></div>
        <div><Report
          title="Invoices By Date"
          type={ReportType.Table}
          data={{
            columns,
            rows,
            noDataMsg: selectedInvoicesDate
              ? 'There are no invoices for the selected date yet'
              : 'Please select the date to see invoices'
          }}
        >
          <FormControl className="LatestInvoicesTable-date-field-wrapper">
            <TextField
              id="date"
              label="Invoices Date"
              type="date"
              className="LatestInvoicesTable-date-field"
              value={selectedInvoicesDate}
              onChange={onInvoicesDateChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
        </Report></div>
      </ReportsContainer>
    </div>
  )
}

export default Invoices;
