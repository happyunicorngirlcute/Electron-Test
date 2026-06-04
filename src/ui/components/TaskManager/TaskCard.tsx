import type { Task } from '../../types/task';
import { PRIORITY_LABELS } from '../../types/task';
import './TaskCard.css';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function TaskCard({ task, onDelete }: TaskCardProps) {
  return (
    <div className="task-card" draggable>
      <div className="task-card-header">
        <h4 className="task-card-title">{task.title}</h4>
        <span className={`task-card-priority task-card-priority--${task.priority}`}>
          {PRIORITY_LABELS[task.priority]}
        </span>
      </div>

      {task.description && (
        <p className="task-card-desc">{task.description}</p>
      )}

      <div className="task-card-footer">
        <span className="task-card-time">{timeAgo(task.createdAt)}</span>
        <button
          className="task-card-delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          aria-label="Delete task"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
