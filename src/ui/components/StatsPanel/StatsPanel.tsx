import { useState } from 'react';
import './StatsPanel.css';

const PLACEHOLDER_VALUES = ['—', '—', '—'] as const;

export function StatsPanel() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="stats-panel">
      <div className="stats-panel-header">
        <h4>System Stats</h4>
        <button
          className="stats-panel-toggle"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? 'Expand stats' : 'Collapse stats'}
        >
          {collapsed ? '+' : '−'}
        </button>
      </div>

      {!collapsed && (
        <>
          <div className="stats-cards">
            <div className="stats-card stats-card--placeholder">
              <div className="stats-card-info">
                <span className="stats-card-label">CPU Usage</span>
                <span className="stats-card-value">{PLACEHOLDER_VALUES[0]}</span>
              </div>
              <span className="stats-card-badge">Placeholder</span>
            </div>

            <div className="stats-card stats-card--placeholder">
              <div className="stats-card-info">
                <span className="stats-card-label">RAM Usage</span>
                <span className="stats-card-value">{PLACEHOLDER_VALUES[1]}</span>
              </div>
              <span className="stats-card-badge">Placeholder</span>
            </div>

            <div className="stats-card stats-card--placeholder">
              <div className="stats-card-info">
                <span className="stats-card-label">Storage</span>
                <span className="stats-card-value">{PLACEHOLDER_VALUES[2]}</span>
              </div>
              <span className="stats-card-badge">Placeholder</span>
            </div>
          </div>

          <div className="stats-note">
            {/* TODO: Connect real CPU/RAM/storage data from IPC */}
            Real-time system stats will appear here when connected.
          </div>
        </>
      )}
    </div>
  );
}
