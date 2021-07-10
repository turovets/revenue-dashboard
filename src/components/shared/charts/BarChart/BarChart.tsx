import { memo, ReactNode } from 'react';
import Plot from 'react-plotly.js';

export type BarChartData = {
  x: string[];
  y: number[];
}
type BarChartProps = {
  data: BarChartData;
  children?: ReactNode;
};

const BarChart = ({
  data,
  children,
}: BarChartProps) => {

  return (
    <>
      {children}
      <Plot
        data={[{ ...data, type: 'bar' }]}
        layout={ { height: 640 } }
        config={{ responsive: true }}
      />
    </>
  );
};

export default memo(BarChart);
