import LineChart from '../LineChart';
import BarChart from '../BarChart';

export interface Report {
  title: string;
  type: ReportType;
  data: any[];
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
        return <BarChart data={data} />;
        case ReportType.Line:
        return <LineChart data={data} />;
        case ReportType.Table:
        return <div>Table</div>;
      default:
        return 'Invalid Report Type';
    }
  }

  return (
    <div>
      <h4>{title}</h4>
      {renderReport()}
    </div>
  )
}

export default Report;
