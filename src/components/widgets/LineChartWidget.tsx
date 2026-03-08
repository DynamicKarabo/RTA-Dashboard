import React, { useMemo } from 'react';
import uPlot from 'uplot';
import 'uplot/dist/uPlot.min.css';
import { useStore } from '../../store/useStore';
import { ResponsiveUplot } from './ResponsiveUplot';

interface LineChartWidgetProps {
  dataKey: 'cpu' | 'memory';
  color: string;
}

export const LineChartWidget: React.FC<LineChartWidgetProps> = ({ dataKey, color }) => {
  const metrics = useStore(state => state.metrics[dataKey]);

  // Transform data into uPlot's required format: [ [xValues], [yValues] ]
  const data: uPlot.AlignedData = useMemo(() => {
    return [
      metrics.map(m => m.timestamp / 1000), // uplot expects seconds for time
      metrics.map(m => m.value)
    ];
  }, [metrics]);

  const options: uPlot.Options = useMemo(() => {
    return {
      width: 0, // Will be set by ResponsiveUplot
      height: 0, // Will be set by ResponsiveUplot
      axes: [
        {
          stroke: 'var(--text-muted)',
          grid: { stroke: 'rgba(255, 255, 255, 0.05)', width: 1 },
          font: '11px var(--font-family)',
        },
        {
          stroke: 'var(--text-muted)',
          grid: { stroke: 'rgba(255, 255, 255, 0.05)', width: 1 },
          font: '11px var(--font-family)',
        }
      ],
      series: [
        {},
        {
          stroke: color,
          width: 2,
          fill: `rgba(${color.includes('accent') ? '79,70,229' : '16,185,129'}, 0.1)`
        }
      ],
      cursor: {
        points: { show: false }
      },
      legend: { show: false }
    };
  }, [color]);

  return (
    <div style={{ width: '100%', height: '100%', padding: '0 8px 16px' }}>
      <ResponsiveUplot options={options} data={data} />
    </div>
  );
};
