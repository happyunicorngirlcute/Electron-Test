import { useTasks } from '../../hooks/useTasks';
import { StatsPanel } from '../StatsPanel/StatsPanel';
import { STATUS_LABELS } from '../../types/task';
import type { TaskStatus } from '../../types/task';
import './Sidebar.css';

const STATUS_ORDER: TaskStatus[] = ['backlog', 'in-progress', 'done'];

export function Sidebar() {
  const { tasks, filter, setFilter } = useTasks();

  const counts = {
    all: tasks.length,
    backlog: tasks.filter((t) => t.status === 'backlog').length,
    'in-progress': tasks.filter((t) => t.status === 'in-progress').length,
    done: tasks.filter((t) => t.status === 'done').length,
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3 className="sidebar-section-title">Filters</h3>
        <ul className="sidebar-nav">
          <li>
            <button
              className={`sidebar-nav-item${filter === 'all' ? ' sidebar-nav-item--active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Tasks
              <span className="nav-count">{counts.all}</span>
            </button>
          </li>
          {STATUS_ORDER.map((status) => (
            <li key={status}>
              <button
                className={`sidebar-nav-item${filter === status ? ' sidebar-nav-item--active' : ''}`}
                onClick={() => setFilter(status)}
              >
                <span className={`nav-dot nav-dot--${status}`} />
                {STATUS_LABELS[status]}
                <span className="nav-count">{counts[status]}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <StatsPanel />
    </aside>
  );
}
