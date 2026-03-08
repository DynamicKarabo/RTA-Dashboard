import React, { useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { WidgetCard } from './widgets/WidgetCard';
import { LineChartWidget } from './widgets/LineChartWidget';
import { BarChartWidget } from './widgets/BarChartWidget';
import { VirtualTableWidget } from './widgets/VirtualTableWidget';
import { MetricCardWidget } from './widgets/MetricCardWidget';
import { CandlestickChartWidget } from './widgets/CandlestickChartWidget';

const Grid: any = GridLayout;

// @ts-ignore: ignoring missing layout types for now
const initialLayout: any[] = [
  { i: 'server-cpu', x: 0, y: 0, w: 6, h: 8, minW: 3, minH: 5 },
  { i: 'server-mem', x: 6, y: 0, w: 6, h: 8, minW: 3, minH: 5 },
  { i: 'market-ohlc', x: 0, y: 8, w: 6, h: 10, minW: 4, minH: 6 },
  { i: 'network-traffic', x: 6, y: 8, w: 6, h: 10, minW: 4, minH: 6 },
  { i: 'logs-table', x: 0, y: 18, w: 8, h: 12, minW: 6, minH: 8 },
  { i: 'active-users', x: 8, y: 18, w: 4, h: 12, minW: 3, minH: 6 },
];

export const DashboardGrid: React.FC = () => {
  const [layout, setLayout] = useState<any[]>(initialLayout);
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    // Basic window resize handler for the grid layout
    const handleResize = () => {
      const container = document.getElementById('grid-container');
      if (container) {
        setWidth(container.offsetWidth);
      }
    };
    
    window.addEventListener('resize', handleResize);
    setTimeout(handleResize, 100); // Initial check after render
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onLayoutChange = (newLayout: any) => {
    setLayout(newLayout);
    // Here we could persist to localStorage or backend
  };

  return (
    <div id="grid-container" style={{ width: '100%', height: '100%' }}>
      {width > 0 && (
        <Grid
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={30}
          width={width}
          onLayoutChange={onLayoutChange}
          draggableHandle=".WidgetCard-header"
          margin={[16, 16]}
        >
          <div key="server-cpu">
            <WidgetCard title="CPU Usage" subtitle="Real-time average across cluster">
              <LineChartWidget dataKey="cpu" color="var(--accent-color)" />
            </WidgetCard>
          </div>
          <div key="server-mem">
            <WidgetCard title="Memory Usage" subtitle="Allocated vs Free">
              <LineChartWidget dataKey="memory" color="var(--success)" />
            </WidgetCard>
          </div>
          <div key="market-ohlc">
            <WidgetCard title="Market Performance" subtitle="Real-time OHLC data">
              <CandlestickChartWidget />
            </WidgetCard>
          </div>
          <div key="network-traffic">
            <WidgetCard title="Network Ingress / Egress" subtitle="Packets per second">
              <BarChartWidget />
            </WidgetCard>
          </div>
          <div key="logs-table">
            <WidgetCard title="Live Stream Logs" subtitle="Top 10k recent events">
              <VirtualTableWidget />
            </WidgetCard>
          </div>
          <div key="active-users">
            <WidgetCard title="Active Users">
              <MetricCardWidget />
            </WidgetCard>
          </div>
        </Grid>
      )}
    </div>
  );
};
