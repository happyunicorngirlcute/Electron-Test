import type { Task, TaskStatus } from '../../types/task';
import { STATUS_LABELS } from '../../types/task';
import { TaskCard } from './TaskCard';
import './TaskColumn.css';

interface TaskColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onDelete: (id: string) => void;
}

const EMPTY_MESSAGES: Record<TaskStatus, string> = {
  'backlog': 'No tasks in backlog',
  'in-progress': 'No tasks in progress',
  'done': 'No completed tasks',
};

export function TaskColumn({ status, tasks, onDelete }: TaskColumnProps) {
  return (
    <div className="task-column">
      <div className="task-column-header">
        <div className="task-column-title">
          <span className={`task-column-dot task-column-dot--${status}`} />
          {STATUS_LABELS[status]}
        </div>
        <span className="task-column-count">{tasks.length}</span>
      </div>

      <div className="task-column-body">
        {tasks.length === 0 ? (
          <div className="task-column-empty">
            {EMPTY_MESSAGES[status]}
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
