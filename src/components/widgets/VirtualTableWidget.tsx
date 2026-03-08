import React, { useRef, useState, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useStore } from '../../store/useStore';
import { Search, Filter } from 'lucide-react';

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
    estimateSize: () => 36,
    overscan: 10,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', background: 'var(--bg-primary)' }}>
      <div style={{ 
        padding: '12px 16px', 
        flexShrink: 0, 
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search logs..." 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              width: '100%',
              padding: '6px 12px 6px 32px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              outline: 'none',
              fontSize: '0.8rem',
              transition: 'all var(--transition-fast)'
            }}
          />
        </div>
        <button className="glass-button" style={{ padding: '6px 12px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Filter size={12} />
          <span>Filters</span>
        </button>
      </div>

      {/* Table Header */}
      <div style={{ 
        display: 'flex', 
        padding: '8px 16px', 
        background: 'var(--bg-secondary)', 
        borderBottom: '1px solid var(--border-color)',
        fontSize: '0.75rem',
        fontWeight: 600,
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        gap: '12px'
      }}>
        <span style={{ minWidth: '70px' }}>Time</span>
        <span style={{ minWidth: '60px' }}>Level</span>
        <span style={{ minWidth: '130px' }}>Service</span>
        <span style={{ flex: 1 }}>Message</span>
      </div>

      <div 
        ref={parentRef} 
        style={{ 
          flex: 1, 
          overflow: 'auto', 
          width: '100%',
          scrollbarWidth: 'thin'
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
            if (!log) return null;

            const levelColor = 
              log.level === 'ERROR' ? 'var(--danger)' : 
              log.level === 'WARN' ? 'var(--warning)' : 
              'var(--success)';

            return (
              <div
                key={virtualRow.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 16px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.02)',
                  fontSize: '0.8rem',
                  gap: '12px',
                  fontFamily: 'var(--font-mono)',
                  background: virtualRow.index % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.01)'
                }}
              >
                <span style={{ color: 'var(--text-muted)', minWidth: '70px' }}>
                  {new Date(log.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
                <span style={{ 
                  color: levelColor, 
                  fontWeight: 600, 
                  minWidth: '60px',
                  fontSize: '0.7rem',
                  letterSpacing: '0.02em'
                }}>
                  {log.level}
                </span>
                <span style={{ color: 'var(--accent-color)', minWidth: '130px', opacity: 0.9 }}>
                  {log.service}
                </span>
                <span style={{ 
                  color: 'var(--text-primary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  flex: 1
                }}>
                  {log.message}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      <div style={{ 
        padding: '4px 12px', 
        background: 'var(--bg-tertiary)', 
        borderTop: '1px solid var(--border-color)',
        fontSize: '0.7rem',
        color: 'var(--text-muted)',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <span>Total logs: {logs.length.toLocaleString()}</span>
        <span>Filtered: {filteredLogs.length.toLocaleString()}</span>
      </div>
    </div>
  );
};
