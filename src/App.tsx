
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
          <div>Real-time Analytics</div>
          <div>User Profile</div>
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
