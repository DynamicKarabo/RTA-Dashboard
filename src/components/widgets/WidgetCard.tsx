import React, { type ReactNode } from 'react';

interface WidgetCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export const WidgetCard: React.FC<WidgetCardProps> = ({ title, subtitle, children }) => {
  return (
    <div className="WidgetCard glass-panel">
      <div className="WidgetCard-header">
        <div>
          <h3 className="WidgetCard-title">{title}</h3>
          {subtitle && <p className="WidgetCard-subtitle">{subtitle}</p>}
        </div>
      </div>
      <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
        {children}
      </div>
    </div>
  );
};
