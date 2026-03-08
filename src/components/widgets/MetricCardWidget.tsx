import React from 'react';
import { useStore } from '../../store/useStore';

export const MetricCardWidget: React.FC = () => {
  const activeUsers = useStore(state => state.activeUsers);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '24px',
      height: '100%',
      gap: '12px'
    }}>
      <div style={{
        fontSize: '4rem',
        fontWeight: 400,
        fontFamily: 'SF Mono, monospace', // Terminal feel
        color: 'var(--text-primary)',
        lineHeight: 1,
        letterSpacing: '-2px'
      }}>
        {activeUsers.toLocaleString()}
      </div>
      <div style={{
        color: 'var(--text-primary)',
        fontSize: '0.85rem',
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <span style={{ 
          background: 'rgba(16, 185, 129, 0.1)', 
          color: 'var(--success)', 
          padding: '2px 6px', 
          borderRadius: '4px' 
        }}>↑ +12.4%</span>
        <span style={{ color: 'var(--text-muted)' }}>vs previous timeframe</span>
      </div>
    </div>
  );
};
