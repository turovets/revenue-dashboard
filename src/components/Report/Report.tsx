import { ReactNode } from 'react';

import LineChart from '../shared/charts/LineChart';
import BarChart from '../shared/charts/BarChart';
import './Report.scss'
import Table from '../shared/Table';

export interface ReportProps {
  title: string;
  type: ReportType;
  // TODO: fix type
  data: any;
  children?: ReactNode;
}

export enum ReportType {
  Bar,
  Line,
  Table
}

const Report = ({
  title,
  type,
  data,
  children,
}: ReportProps) => {

  const renderReport = () => {
    switch(type) {
      case ReportType.Bar:
        return <BarChart children={children} data={data} />;
        case ReportType.Line:
        return <LineChart children={children} data={data} />;
        case ReportType.Table:
        return <Table {...data} children={children} />;
      default:
        return 'Invalid Report Type';
    }
  }

  return (
    <>
      <div className="Report-title">{title}</div>
      {renderReport()}
    </>
  )
}

export default Report;
