import { useState } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { TaskColumn } from './TaskColumn';
import { TaskForm } from '../TaskForm/TaskForm';
import type { TaskStatus, TaskPriority } from '../../types/task';
import './TaskManager.css';

const COLUMNS: TaskStatus[] = ['backlog', 'in-progress', 'done'];

export function TaskManager() {
  const { tasks, addTask, deleteTask } = useTasks();
  const [showForm, setShowForm] = useState(false);

  const handleAddTask = (title: string, description: string, priority: TaskPriority) => {
    addTask(title, description, priority);
    setShowForm(false);
  };

  return (
    <div className="task-manager">
      <div className="task-manager-header">
        <div>
          <h1 className="task-manager-title">Tasks</h1>
          <p className="task-manager-subtitle">{tasks.length} total tasks</p>
        </div>
        <div className="task-manager-actions">
          <button className="task-manager-add-btn" onClick={() => setShowForm(true)}>
            <span>+</span> New Task
          </button>
        </div>
      </div>

      <div className="task-manager-board">
        {COLUMNS.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks.filter((t) => t.status === status)}
            onDelete={deleteTask}
          />
        ))}
      </div>

      {showForm && (
        <TaskForm
          onClose={() => setShowForm(false)}
          onSubmit={handleAddTask}
        />
      )}
    </div>
  );
}
