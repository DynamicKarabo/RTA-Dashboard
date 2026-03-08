import React, { useMemo } from 'react';
import uPlot from 'uplot';
import 'uplot/dist/uPlot.min.css';
import { useStore } from '../../store/useStore';
import { ResponsiveUplot } from './ResponsiveUplot';

export const BarChartWidget: React.FC = () => {
  const network = useStore(state => state.metrics.network);

  const data: uPlot.AlignedData = useMemo(() => {
    return [
      network.map(m => m.timestamp / 1000),
      network.map(m => m.in),
      network.map(m => m.out)
    ];
  }, [network]);

  const options: uPlot.Options = useMemo(() => {
    return {
      width: 0,
      height: 0,
      scales: { x: { time: true } },
      axes: [
        {
          stroke: 'var(--text-muted)',
          grid: { stroke: 'rgba(255, 255, 255, 0.05)', width: 1 },
        },
        {
          stroke: 'var(--text-muted)',
          grid: { stroke: 'rgba(255, 255, 255, 0.05)', width: 1 },
        }
      ],
      series: [
        {},
        {
          label: 'Ingress',
          stroke: 'var(--success)',
          fill: 'rgba(16, 185, 129, 0.2)',
          width: 2,
        },
        {
          label: 'Egress',
          stroke: 'var(--danger)',
          fill: 'rgba(239, 68, 68, 0.2)',
          width: 2,
        }
      ],
      legend: { show: true }
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', padding: '0 8px 16px' }}>
      <ResponsiveUplot options={options} data={data} />
    </div>
  );
};
