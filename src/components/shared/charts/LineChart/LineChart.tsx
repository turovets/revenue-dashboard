import React, { memo } from 'react';
import Plot from 'react-plotly.js';

export type LineChartProps = {
  x: Date[];
  y: number[];
}

const LineChart: React.FC<LineChartProps> = (props) => {
  return (
    <Plot
      data={[props]}
      layout={ { height: 640 } }
      config={{ responsive: true }}
    />
  );
};

export default memo(LineChart);
