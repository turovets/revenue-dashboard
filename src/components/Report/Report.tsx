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
  // data,
}: Report) => {

  const renderReport = () => {
    switch(type) {
      case ReportType.Bar:
        return () => <div>Bar Chart</div>;
        case ReportType.Line:
        return () => <div>Line Chart</div>;
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
