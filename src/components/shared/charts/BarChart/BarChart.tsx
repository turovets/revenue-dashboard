import { memo } from 'react';
import Plot from 'react-plotly.js';

export type BarChartProps = {
  x: string[];
  y: number[];
}

const BarChart: React.FC<BarChartProps> = (props) => {

  return (
    <Plot
      data={[{ ...props, type: 'bar' }]}
      layout={ { height: 640 } }
      config={{ responsive: true }}
    />
  );
};

export default memo(BarChart);
