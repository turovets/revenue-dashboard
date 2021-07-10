import { memo } from 'react';

import './BarChart.scss';

export type BarChartDataItem = {
  name: string;
  value: number;
}
type BarChartProps = {
  data: BarChartDataItem[];
};

const BarChart = ({
  data,
}: BarChartProps) => {

  return (
    <>
      Bar Chart Component
      {data.map(({ name, value }, index) => <div key={index}>{name}: {value}</div>)}
    </>
  );
};

export default memo(BarChart);
