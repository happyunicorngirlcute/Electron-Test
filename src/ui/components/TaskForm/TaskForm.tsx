import { useState, type FormEvent } from 'react';
import type { TaskPriority } from '../../types/task';
import { PRIORITY_LABELS } from '../../types/task';
import './TaskForm.css';

interface TaskFormProps {
  onClose: () => void;
  onSubmit: (title: string, description: string, priority: TaskPriority) => void;
  initialTitle?: string;
  initialDescription?: string;
  initialPriority?: TaskPriority;
}

export function TaskForm({
  onClose,
  onSubmit,
  initialTitle = '',
  initialDescription = '',
  initialPriority = 'medium',
}: TaskFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [priority, setPriority] = useState<TaskPriority>(initialPriority);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit(title.trim(), description.trim(), priority);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{initialTitle ? 'Edit Task' : 'New Task'}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-field">
            <label className="modal-label">Title</label>
            <input
              className="modal-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Implement user authentication"
              autoFocus
            />
          </div>

          <div className="modal-field">
            <label className="modal-label">Description</label>
            <textarea
              className="modal-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details, links, or notes..."
            />
          </div>

          <div className="modal-field">
            <label className="modal-label">Priority</label>
            <select
              className="modal-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
            >
              {Object.entries(PRIORITY_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="modal-btn modal-btn--cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-btn modal-btn--submit" disabled={!title.trim()}>
              {initialTitle ? 'Save' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
