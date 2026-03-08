import React, { type ReactNode } from 'react';

interface WidgetCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export const WidgetCard: React.FC<WidgetCardProps> = ({ title, subtitle, children }) => {
  return (
    <div className="WidgetCard">
      <div className="WidgetCard-header" style={{ cursor: 'move' }}>
        <div>
          <h3 className="WidgetCard-title">{title}</h3>
          {subtitle && <p className="WidgetCard-subtitle">{subtitle}</p>}
        </div>
        <div style={{ color: 'var(--text-muted)' }}>⋮</div>
      </div>
      <div style={{ flex: 1, minHeight: 0, position: 'relative', overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
};
