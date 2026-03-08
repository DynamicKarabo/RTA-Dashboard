import React, { useEffect, useRef, useState } from 'react';
import uPlot from 'uplot';
import UplotReact from 'uplot-react';
import 'uplot/dist/uPlot.min.css';

interface ResponsiveUplotProps {
  options: uPlot.Options;
  data: uPlot.AlignedData;
  onCreate?: (chart: uPlot) => void;
  onDelete?: (chart: uPlot) => void;
}

export const ResponsiveUplot: React.FC<ResponsiveUplotProps> = ({ 
  options, 
  data, 
  onCreate, 
  onDelete 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<uPlot | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (chartRef.current && size.width > 0 && size.height > 0) {
      chartRef.current.setSize({ width: size.width, height: size.height });
    }
  }, [size]);

  const handleCreate = (chart: uPlot) => {
    chartRef.current = chart;
    if (size.width > 0 && size.height > 0) {
      chart.setSize({ width: size.width, height: size.height });
    }
    onCreate?.(chart);
  };

  const handleDelete = (chart: uPlot) => {
    chartRef.current = null;
    onDelete?.(chart);
  };

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {size.width > 0 && size.height > 0 && (
        <UplotReact 
          options={{ ...options, width: size.width, height: size.height }} 
          data={data} 
          onCreate={handleCreate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};
