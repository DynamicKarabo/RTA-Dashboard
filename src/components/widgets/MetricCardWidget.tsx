import React from 'react';
import { useStore } from '../../store/useStore';

export const MetricCardWidget: React.FC = () => {
  const activeUsers = useStore(state => state.activeUsers);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      gap: '8px'
    }}>
      <div style={{
        fontSize: '3.5rem',
        fontWeight: 800,
        color: 'var(--text-primary)',
        lineHeight: 1,
        textShadow: 'var(--shadow-glow)'
      }}>
        {activeUsers.toLocaleString()}
      </div>
      <div style={{
        color: 'var(--success)',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}>
        <span>▲ 12% from last hour</span>
      </div>
    </div>
  );
};
