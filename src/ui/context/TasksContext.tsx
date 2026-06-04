/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { Task, TaskStatus } from '../types/task';

interface TasksState {
  tasks: Task[];
  filter: TaskStatus | 'all';
}

type TasksAction =
  | { type: 'ADD_TASK'; task: Task }
  | { type: 'UPDATE_TASK'; task: Task }
  | { type: 'DELETE_TASK'; id: string }
  | { type: 'MOVE_TASK'; id: string; status: TaskStatus }
  | { type: 'SET_FILTER'; filter: TaskStatus | 'all' };

function tasksReducer(state: TasksState, action: TasksAction): TasksState {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.task] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) => (t.id === action.task.id ? action.task : t)),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.id),
      };
    case 'MOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, status: action.status } : t
        ),
      };
    case 'SET_FILTER':
      return { ...state, filter: action.filter };
    default:
      return state;
  }
}

const INITIAL_TASKS: Task[] = [
  {
    id: 'sample-1',
    title: 'Design system audit for Q3',
    description: 'Review all component library tokens, identify inconsistencies in spacing and color usage across the platform.',
    status: 'in-progress',
    priority: 'high',
    createdAt: Date.now() - 7200000,
  },
  {
    id: 'sample-2',
    title: 'Implement file upload API endpoint',
    description: 'Build multipart upload handler with chunked transfer support for large files up to 2GB.',
    status: 'backlog',
    priority: 'high',
    createdAt: Date.now() - 10800000,
  },
  {
    id: 'sample-3',
    title: 'Update onboarding flow copy',
    description: 'Rewrite step 3 and 4 to clarify workspace creation and invitation flow based on user testing feedback.',
    status: 'backlog',
    priority: 'medium',
    createdAt: Date.now() - 86400000,
  },
  {
    id: 'sample-4',
    title: 'Migrate CI pipeline to GitHub Actions',
    description: 'Replace Jenkins jobs with reusable workflow actions. Must maintain parity on all build and test stages.',
    status: 'in-progress',
    priority: 'high',
    createdAt: Date.now() - 43200000,
  },
  {
    id: 'sample-5',
    title: 'Add keyboard shortcuts for task navigation',
    description: 'Implement j/k for list navigation, n for new task, cmd+enter for save. Document in settings panel.',
    status: 'done',
    priority: 'medium',
    createdAt: Date.now() - 172800000,
  },
  {
    id: 'sample-6',
    title: 'Fix pagination offset bug on search results',
    description: 'Page parameter is not being reset when filters change, causing empty results on subsequent queries.',
    status: 'done',
    priority: 'high',
    createdAt: Date.now() - 259200000,
  },
  {
    id: 'sample-7',
    title: 'Add dark mode support for code blocks',
    description: 'Prism theme needs a dark variant. Map token colors to CSS variables for theme switching.',
    status: 'backlog',
    priority: 'low',
    createdAt: Date.now() - 3600000,
  },
  {
    id: 'sample-8',
    title: 'Write integration tests for auth module',
    description: 'Cover login, token refresh, session expiry, and concurrent session handling with Playwright.',
    status: 'done',
    priority: 'medium',
    createdAt: Date.now() - 604800000,
  },
];

const TasksContext = createContext<{
  state: TasksState;
  dispatch: React.Dispatch<TasksAction>;
} | null>(null);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(tasksReducer, {
    tasks: INITIAL_TASKS,
    filter: 'all',
  });

  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasksContext() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasksContext must be used within TasksProvider');
  return ctx;
}
