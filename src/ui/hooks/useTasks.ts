import { useCallback } from 'react';
import { useTasksContext } from '../context/TasksContext';
import type { Task, TaskPriority, TaskStatus } from '../types/task';

let nextId = 1;

export function useTasks() {
  const { state, dispatch } = useTasksContext();

  const addTask = useCallback(
    (title: string, description: string, priority: TaskPriority) => {
      const task: Task = {
        id: `task-${nextId++}`,
        title,
        description,
        status: 'backlog',
        priority,
        createdAt: Date.now(),
      };
      dispatch({ type: 'ADD_TASK', task });
    },
    [dispatch]
  );

  const updateTask = useCallback(
    (task: Task) => {
      dispatch({ type: 'UPDATE_TASK', task });
    },
    [dispatch]
  );

  const deleteTask = useCallback(
    (id: string) => {
      dispatch({ type: 'DELETE_TASK', id });
    },
    [dispatch]
  );

  const moveTask = useCallback(
    (id: string, status: TaskStatus) => {
      dispatch({ type: 'MOVE_TASK', id, status });
    },
    [dispatch]
  );

  const setFilter = useCallback(
    (filter: TaskStatus | 'all') => {
      dispatch({ type: 'SET_FILTER', filter });
    },
    [dispatch]
  );

  const filteredTasks =
    state.filter === 'all'
      ? state.tasks
      : state.tasks.filter((t) => t.status === state.filter);

  return {
    tasks: state.tasks,
    filteredTasks,
    filter: state.filter,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    setFilter,
  };
}
