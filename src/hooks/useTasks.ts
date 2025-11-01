import { useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';

export const useTasks = () => {
  const context = useTaskContext();
  const { fetchTasks, filters } = context;

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks, filters]);

  return context;
};
