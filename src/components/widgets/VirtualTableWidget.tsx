import React, { useRef, useState, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useStore } from '../../store/useStore';

export const VirtualTableWidget: React.FC = () => {
  const logs = useStore(state => state.logs);
  const [filter, setFilter] = useState('');
  const parentRef = useRef<HTMLDivElement>(null);

  const filteredLogs = useMemo(() => {
    if (!filter) return logs;
    const lowerFilter = filter.toLowerCase();
    return logs.filter(l => 
      l.message.toLowerCase().includes(lowerFilter) || 
      l.service.toLowerCase().includes(lowerFilter) ||
      l.level.toLowerCase().includes(lowerFilter)
    );
  }, [logs, filter]);

  const rowVirtualizer = useVirtualizer({
    count: filteredLogs.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 36, // height of row
    overscan: 5,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <div style={{ paddingBottom: '12px', flexShrink: 0 }}>
        <input 
          type="text" 
          placeholder="Filter logs by level, service, or message..." 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            outline: 'none',
            fontSize: '0.9rem'
          }}
        />
      </div>
      <div 
        ref={parentRef} 
        style={{ 
          flex: 1, 
          overflow: 'auto', 
          width: '100%' 
        }}
      >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const log = filteredLogs[virtualRow.index];
          const levelColor = 
            log.level === 'ERROR' ? 'var(--danger)' : 
            log.level === 'WARN' ? 'var(--warning)' : 
            'var(--success)';

          return (
            <div
              key={virtualRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
                display: 'flex',
                alignItems: 'center',
                padding: '0 12px',
                borderBottom: '1px solid var(--border-color)',
                fontSize: '0.85rem',
                gap: '12px'
              }}
            >
              <span style={{ color: 'var(--text-muted)', minWidth: '70px' }}>
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
              <span style={{ 
                color: levelColor, 
                fontWeight: 'bold', 
                minWidth: '50px' 
              }}>
                {log.level}
              </span>
              <span style={{ color: 'var(--accent-color)', minWidth: '130px' }}>
                {log.service}
              </span>
              <span style={{ 
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {log.message}
              </span>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};
