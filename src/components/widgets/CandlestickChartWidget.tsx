import React, { useMemo } from 'react';
import uPlot from 'uplot';
import { useStore } from '../../store/useStore';
import { ResponsiveUplot } from './ResponsiveUplot';

export const CandlestickChartWidget: React.FC = () => {
  const ohlcData = useStore(state => state.metrics.ohlc);

  const data: uPlot.AlignedData = useMemo(() => {
    return [
      ohlcData.map(d => d.timestamp / 1000),
      ohlcData.map(d => d.open),
      ohlcData.map(d => d.high),
      ohlcData.map(d => d.low),
      ohlcData.map(d => d.close),
    ];
  }, [ohlcData]);

  const options: uPlot.Options = useMemo(() => {
    return {
      width: 0,
      height: 0,
      scales: {
        x: { time: true },
        y: { range: (u, min, max) => [min * 0.99, max * 1.01] }
      },
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
          label: 'Price',
          paths: (u) => {
            const { ctx, data } = u;
            if (!ctx || !data) return null;

            const xData = data[0];
            const openData = data[1] as number[];
            const highData = data[2] as number[];
            const lowData = data[3] as number[];
            const closeData = data[4] as number[];

            ctx.save();
            
            for (let i = 0; i < xData.length; i++) {
              const xVal = xData[i];
              if (xVal == null) continue;

              const x = u.valToPos(xVal, 'x', true);
              const open = u.valToPos(openData[i], 'y', true);
              const high = u.valToPos(highData[i], 'y', true);
              const low = u.valToPos(lowData[i], 'y', true);
              const close = u.valToPos(closeData[i], 'y', true);

              if (x == null || open == null || high == null || low == null || close == null) continue;

              const isUp = closeData[i] >= openData[i];
              ctx.strokeStyle = isUp ? '#10b981' : '#ef4444';
              ctx.fillStyle = isUp ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)';
              ctx.lineWidth = 1;

              // Wick
              ctx.beginPath();
              ctx.moveTo(x, high);
              ctx.lineTo(x, low);
              ctx.stroke();

              // Body
              const bodyHeight = Math.max(0.5, Math.abs(close - open));
              const bodyTop = Math.min(open, close);
              ctx.fillRect(x - 4, bodyTop, 8, bodyHeight);
              ctx.strokeRect(x - 4, bodyTop, 8, bodyHeight);
            }

            ctx.restore();
            return null; // Don't return standard paths
          }
        }
      ],
      legend: { show: false }
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', padding: '0 8px 16px' }}>
      <ResponsiveUplot options={options} data={data} />
    </div>
  );
};
