import React, { useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { TrendingUp, Users } from 'lucide-react';
import { ResponsiveUplot } from './ResponsiveUplot';
import uPlot from 'uplot';

export const MetricCardWidget: React.FC = () => {
  const activeUsers = useStore(state => state.activeUsers);
  const cpuMetrics = useStore(state => state.metrics.cpu);

  // Use CPU metrics as a dummy sparkline data for now
  const sparklineData: uPlot.AlignedData = useMemo(() => {
    const subset = cpuMetrics.slice(-20);
    return [
      subset.map(m => m.timestamp / 1000),
      subset.map(m => m.value)
    ];
  }, [cpuMetrics]);

  const sparklineOptions: uPlot.Options = useMemo(() => ({
    width: 120,
    height: 40,
    axes: [{ show: false }, { show: false }],
    series: [
      {},
      {
        stroke: 'var(--success)',
        width: 2,
        points: { show: false }
      }
    ],
    cursor: { show: false },
    legend: { show: false },
    padding: [0, 0, 0, 0]
  }), []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      height: '100%',
      gap: '8px',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
            Current Concurrent Users
          </div>
          <div style={{
            fontSize: '3.5rem',
            fontWeight: 300,
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-primary)',
            lineHeight: 1,
            letterSpacing: '-2px'
          }}>
            {activeUsers.toLocaleString()}
          </div>
        </div>
        <div style={{ background: 'var(--bg-tertiary)', padding: '8px', borderRadius: 'var(--radius-md)', color: 'var(--accent-color)' }}>
          <Users size={20} />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{
            color: 'var(--success)',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <TrendingUp size={14} />
            <span>+12.4%</span>
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
            from last hour
          </div>
        </div>
        <div style={{ width: '120px', height: '40px' }}>
          <ResponsiveUplot options={sparklineOptions} data={sparklineData} />
        </div>
      </div>
    </div>
  );
};
