import React, { useMemo } from 'react';
import UplotReact from 'uplot-react';
import uPlot from 'uplot';
import 'uplot/dist/uPlot.min.css';
import { useStore } from '../../store/useStore';

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
      width: 400, // Will be responsive
      height: 200,
      axes: [
        {
          stroke: 'var(--text-muted)',
          grid: { stroke: 'var(--border-color)', width: 1 },
          font: '12px var(--font-family)',
        },
        {
          stroke: 'var(--text-muted)',
          grid: { stroke: 'var(--border-color)', width: 1 },
          font: '12px var(--font-family)',
        }
      ],
      series: [
        {},
        {
          stroke: color,
          width: 2,
          fill: `rgba(${color === 'var(--accent-color)' ? '79,70,229' : '16,185,129'}, 0.2)`
        }
      ],
      cursor: {
        points: { show: false }
      },
      legend: { show: false }
    };
  }, [color]);

  // Small wrapper to force 100% width and height using ResizeObserver in a real app
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', padding: '0 16px 16px' }}>
      <UplotReact options={options} data={data} target={document.createElement('div')} />
    </div>
  );
};
