
import './index.css';
import { DashboardGrid } from './components/DashboardGrid';
import { StreamProvider } from './services/StreamProvider';

function App() {
  return (
    <div className="app-container">
      <aside className="sidebar glass-panel">
        <div className="logo">
          <div className="logo-icon"></div>
          <span>RTA Dashboard</span>
        </div>
        <ul className="nav-menu">
          <li className="nav-item active">Overview</li>
          <li className="nav-item">System Metrics</li>
          <li className="nav-item">Logs</li>
          <li className="nav-item">Settings</li>
        </ul>
      </aside>
      
      <main className="main-content">
        <header className="top-bar">
          <div className="top-bar-title">
            <div className="status-indicator"></div>
            Main Cluster Connectivity: 12ms latency
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>UTC 14:02:44</span>
            <span style={{ padding: '4px 12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)', color: 'var(--text-primary)' }}>Admin</span>
          </div>
        </header>
        
        <div className="dashboard-scroll-area">
          <StreamProvider />
          <DashboardGrid />
        </div>
      </main>
    </div>
  );
}

export default App;
