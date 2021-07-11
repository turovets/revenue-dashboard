import React, { useEffect, useMemo, useState} from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';

import './Report.scss'
import LineChart from '../shared/charts/LineChart';
import BarChart from '../shared/charts/BarChart';
import Table from '../shared/Table';
import { Period, ValueType } from '../Dashboard/types';
import Switcher from '../shared/Switcher/Switcher';
import { BarChartProps } from '../shared/charts/BarChart/BarChart';
import { LineChartProps } from '../shared/charts/LineChart/LineChart';
import { StickyHeadTableProps } from '../shared/Table/Table';

export interface ReportConfig<T, Y> {
  title: string;
  getData: () => Promise<T[]>;
  filters: ReportFilter[];
  transformData: (data: T[], filters: ReportSelectedFilter) => Y
}

export interface BarReportConfig<T> extends ReportConfig<T, BarChartProps> {
  type: ReportType.Bar;
}
export interface LineReportConfig<T> extends ReportConfig<T, LineChartProps> {
  type: ReportType.Line;
}
export interface TableReportConfig<T> extends ReportConfig<T, StickyHeadTableProps> {
  type: ReportType.Table;
}

export interface ReportBuilderProps<T> {
  config: BarReportConfig<T> | LineReportConfig<T> | TableReportConfig<T>
}

export enum ReportType {
  Bar = 'bar',
  Line = 'line',
  Table = 'table',
}

export type ReportSelectedFilter = {
  period?: Period;
  valueType?: ValueType;
}
export enum ReportFilter {
  Period,
  ValueType,
}

function ReportBuilder<T extends object>({
  config: { title, type, filters, transformData, getData, },
}: ReportBuilderProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [periodFilter, setPeriodFilter] = useState<Period>(Period.Monthly);
  const [valueTypeFilter, setValueTypeFilter] = useState<ValueType>(ValueType.Revenues);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getData().then((res) => {
      setData(res);
      setIsLoading(false);
    }).catch(console.log);
  }, [])

  const transformedData = useMemo(() => {
    const currentFilters = filters.reduce<ReportSelectedFilter>((acc: ReportSelectedFilter, curr: ReportFilter) => {
      if (curr === ReportFilter.ValueType) {
        acc.valueType = valueTypeFilter
      } else {
        acc.period = periodFilter;
      }
      return acc;
    }, {})
    return transformData(data, currentFilters);
  }, [data, valueTypeFilter, periodFilter]);

  const renderReport = () => {
    switch (type) {
      case ReportType.Bar: {
        return <BarChart {...transformedData as BarChartProps } />;}
      case ReportType.Line:
        return <LineChart {...transformedData as LineChartProps} />;
      case ReportType.Table:
        return <div className="Report-table-wrapper"><Table {...transformedData as StickyHeadTableProps} /></div>;
      default:
        return 'Invalid Report Type';
    }
  };

  return (
    <>
      <div className="Dashboard-component-wrapper">
        {isLoading && <LinearProgress className="Dashboard-progress" />}
        <div className="Dashboard-filters">
          {filters.map((f: ReportFilter) => (
            f === ReportFilter.Period
              ? <Switcher key={f} onChangeHandler={setPeriodFilter} activeItem={periodFilter} items={Object.values(Period)} disabled={isLoading} />
              : <Switcher onChangeHandler={setValueTypeFilter} activeItem={valueTypeFilter} items={Object.values(ValueType)} disabled={isLoading} />
          ))}
          {/* add dummy to align styles */}
          {filters.length === 1 ? <div/> : null}
        </div>
        <div className={`Report-title ${type === ReportType.Table ? 'Report-title--table' : ''}`}>{title}</div>
        {renderReport()}
      </div>
    </>
  )
}

export default ReportBuilder;
