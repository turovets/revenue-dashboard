import { memo } from 'react';
import Plot from 'react-plotly.js';

export type LineChartData = {
  x: Date[];
  y: number[];
}
type LineChartProps = {
  title: string;
  data: LineChartData;
};

const LineChart = ({
  title,
  data,
}: LineChartProps) => {

  return (
    <Plot
      data={[data]}
      layout={ { height: 640, title } }
      config={{ responsive: true }}
    />
  );
};

export default memo(LineChart);
