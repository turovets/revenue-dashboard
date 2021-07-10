import { memo, ReactNode } from 'react';
import Plot from 'react-plotly.js';

export type LineChartData = {
  x: Date[];
  y: number[];
}
type LineChartProps = {
  data: LineChartData;
  children?: ReactNode;
};

const LineChart = ({
  data,
  children,
}: LineChartProps) => {

  return (
    <>
      {children}
      <Plot
        data={[data]}
        layout={ { height: 640 } }
        config={{ responsive: true }}
      />
    </>
  );
};

export default memo(LineChart);
