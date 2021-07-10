import { memo } from 'react';
import Plot from 'react-plotly.js';

import './BarChart.scss';

export type BarChartData = {
  x: string[];
  y: number[];
}
type BarChartProps = {
  title: string;
  data: BarChartData;
};

const BarChart = ({
  title,
  data,
}: BarChartProps) => {

  return (
    <Plot
      data={[{ ...data, type: 'bar' }]}
      layout={ { width: 800, height: 640, title } }
    />
  );
};

export default memo(BarChart);
