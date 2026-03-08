import React, { useMemo } from 'react';
import UplotReact from 'uplot-react';
import uPlot from 'uplot';
import 'uplot/dist/uPlot.min.css';
import { useStore } from '../../store/useStore';

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
      width: 800,
      height: 250,
      scales: { x: { time: true } },
      axes: [
        {
          stroke: 'var(--text-muted)',
          grid: { stroke: 'var(--border-color)', width: 1 },
        },
        {
          stroke: 'var(--text-muted)',
          grid: { stroke: 'var(--border-color)', width: 1 },
        }
      ],
      series: [
        {},
        {
          label: 'Ingress',
          stroke: 'var(--success)',
          fill: 'rgba(16, 185, 129, 0.4)',
          width: 2,
        },
        {
          label: 'Egress',
          stroke: 'var(--danger)',
          fill: 'rgba(239, 68, 68, 0.4)',
          width: 2,
        }
      ],
      legend: { show: true }
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', padding: '0 16px 16px' }}>
      <UplotReact options={options} data={data} target={document.createElement('div')} />
    </div>
  );
};
