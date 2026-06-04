export type TaskStatus = 'backlog' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: number;
}

export const STATUS_LABELS: Record<TaskStatus, string> = {
  'backlog': 'Backlog',
  'in-progress': 'In Progress',
  'done': 'Done',
};

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};
