import LineChart from '../shared/charts/LineChart';
import BarChart from '../shared/charts/BarChart';

export interface Report {
  title: string;
  type: ReportType;
  // TODO: fix type
  data: any;
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
}: Report) => {

  const renderReport = () => {
    switch(type) {
      case ReportType.Bar:
        return <BarChart title={title} data={data} />;
        case ReportType.Line:
        return <LineChart title={title} data={data} />;
        case ReportType.Table:
        return <div>Table</div>;
      default:
        return 'Invalid Report Type';
    }
  }

  return (
    <>
      {renderReport()}
    </>
  )
}

export default Report;
