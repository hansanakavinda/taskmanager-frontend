import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Task, CreateTaskInput, UpdateTaskInput, TaskFilters, ApiError } from '../types';
import apiService from '../services/api';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: ApiError | null;
  filters: TaskFilters;
  fetchTasks: () => Promise<void>;
  createTask: (task: CreateTaskInput) => Promise<void>;
  updateTask: (id: string, task: UpdateTaskInput) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  updateTaskStatus: (id: string, status: string) => Promise<void>;
  setFilters: (filters: TaskFilters) => void;
  clearError: () => void;
  assignUser: (taskId: string, userId: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [filters, setFiltersState] = useState<TaskFilters>({});

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getTasks(filters);
      setTasks(data);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const createTask = async (task: CreateTaskInput) => {
    setLoading(true);
    setError(null);
    try {
      const newTask = await apiService.createTask(task);
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      console.log("Error creating task:", err);
      setError(err as ApiError);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id: string, task: UpdateTaskInput) => {
    setLoading(true);
    setError(null);
    try {
      const updatedTask = await apiService.updateTask(id, task);
      setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
    } catch (err) {
      setError(err as ApiError);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await apiService.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err as ApiError);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (id: string, status: string) => {
    setLoading(true);
    setError(null);
    try {
      const updatedTask = await apiService.updateTaskStatus(id, status);
      setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
    } catch (err) {
      setError(err as ApiError);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const setFilters = (newFilters: TaskFilters) => {
    setFiltersState(newFilters);
  };

  const assignUser = async (id: string, userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const updatedTask = await apiService.assignUserToTask(id, userId);
      setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
    } catch (err) {
      setError(err as ApiError);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        filters,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        updateTaskStatus,
        setFilters,
        clearError,
        assignUser,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
