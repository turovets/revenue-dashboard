import React, { useCallback, useMemo, useState } from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import './Invoices.scss';
import {  ValueType } from '../types';
import Report, { ReportType } from '../../Report/Report';
import { TableColumn } from '../../shared/Table/Table';
import { DateHelper } from '../../../lib/common/DateHelper';
import { Invoice } from '../../../services/invoices/InvoicesService';

type LatestInvoicesTableProps = {
  invoices: Invoice[];
  valueTypeFilter: ValueType;
  dates: Date[];
}

const LATEST_INVOICES_COUNT = 15;

const LatestInvoicesTable = ({
  invoices,
  valueTypeFilter,
  dates,
}: LatestInvoicesTableProps) => {
  const [selectedInvoicesDate, setSelectedInvoicesDate] = useState('');

  const onInvoicesDateChange = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedInvoicesDate(event.target.value as string)
  }, []);

  const rows = useMemo(() => {
    return [...invoices]
      .filter((i) => DateHelper.formatDateToString(i.date) === selectedInvoicesDate)
      .map((i) => ({
        date: i.date,
        name: i.customer_name,
        region: i.region,
        total: valueTypeFilter === ValueType.Revenues ? i.total_invoice : i.total_margin
      }))
      .slice(0, LATEST_INVOICES_COUNT)
  }, [invoices, valueTypeFilter, selectedInvoicesDate])

  const columns: TableColumn[] = [
    { id: 'date', label: 'Date', minWidth: 170, format: (value) => DateHelper.formatDateToString(value) },
    { id: 'customerName', label: 'Customer Name', minWidth: 100 },
    { id: 'region', label: 'Region', minWidth: 100 },
    {
      id: 'total',
      label: valueTypeFilter === ValueType.Revenues ? 'Total Revenue' : 'Total Margin',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
  ];
  return (
    <div className="">
      <Report
        title="Latest Invoices"
        type={ReportType.Table}
        data={{
          columns,
          rows,
          noDataMsg: selectedInvoicesDate
            ? 'There are no invoices for the selected date yet'
            : 'Please select the date to see invoices'
        }}
      >
        <FormControl className="LatestInvoicesTable-select">
          <InputLabel id="invoices-date-label">Date</InputLabel>
          <Select
            labelId="invoices-date-label"
            value={selectedInvoicesDate}
            onChange={onInvoicesDateChange}
            displayEmpty
            placeholder="Select Date"
          >
            {dates.map((date) => {
              const localDate = DateHelper.formatDateToString(date);
              return (
                <MenuItem key={localDate} value={localDate}>{localDate}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Report>
    </div>
  )
}

export default LatestInvoicesTable;
