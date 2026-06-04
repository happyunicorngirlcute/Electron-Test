import { useState } from 'react';
import { useStatistics } from '../../hooks/useStatistics';
import './StatsPanel.css';

function pct(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

function toGB(gb: number): string {
  return `${gb.toFixed(1)} GB`;
}

export function StatsPanel() {
  const { cpuUsage, ramUsage, storageUsage, totalStorageGB, totalMemoryGB } = useStatistics();
  const [collapsed, setCollapsed] = useState(false);

  const cpuPct = pct(cpuUsage);
  const ramPct = pct(ramUsage);
  const storagePct = pct(storageUsage);
  const storageLabel = `${toGB(storageUsage * totalStorageGB)} / ${toGB(totalStorageGB)}`;
  const ramLabel = `${toGB(ramUsage * totalMemoryGB)} / ${toGB(totalMemoryGB)}`;

  return (
    <div className="stats-panel">
      <div className="stats-panel-header">
        <h4>System</h4>
        <button
          className="stats-panel-toggle"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? 'Expand stats' : 'Collapse stats'}
        >
          {collapsed ? '+' : '\u2212'}
        </button>
      </div>

      {!collapsed && (
        <div className="stats-cards">
          <div className="stats-card">
            <div className="stats-card-info">
              <span className="stats-card-label">CPU</span>
              <span className="stats-card-value">{cpuPct}</span>
            </div>
            <div className="stats-card-bar">
              <div className="stats-card-bar-fill" style={{ width: cpuPct }} />
            </div>
          </div>

          <div className="stats-card">
            <div className="stats-card-info">
              <span className="stats-card-label">RAM</span>
              <span className="stats-card-value">{ramLabel}</span>
            </div>
            <div className="stats-card-bar">
              <div className="stats-card-bar-fill" style={{ width: ramPct }} />
            </div>
          </div>

          <div className="stats-card">
            <div className="stats-card-info">
              <span className="stats-card-label">Storage</span>
              <span className="stats-card-value">{storageLabel}</span>
            </div>
            <div className="stats-card-bar">
              <div className="stats-card-bar-fill" style={{ width: storagePct }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
