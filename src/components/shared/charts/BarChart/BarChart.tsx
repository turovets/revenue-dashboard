import { memo } from 'react';
import Plot from 'react-plotly.js';

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
      layout={ { height: 640, title } }
      config={{ responsive: true }}
    />
  );
};

export default memo(BarChart);
