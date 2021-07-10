import { memo } from 'react';

import './LineChart.scss';

export type LineChartDataItem = {
  date: string;
  value: number;
}
type LineChartProps = {
  data: LineChartDataItem[];
};

const LineChart = ({
  data,
}: LineChartProps) => {

  return (
    <>
      Line Chart Component
      {data.map(({ date, value }, index) => <div key={index}>{date}: {value}</div>)}
    </>
  );
};

export default memo(LineChart);
