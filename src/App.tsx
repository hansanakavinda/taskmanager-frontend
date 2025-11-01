import React, { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import { UserProvider } from './context/UserContext';
import { useTasks } from './hooks/useTasks';
import { useUsers } from './hooks/useUsers';
import { useModal } from './hooks/useModal';
import Header from './components/Header';
import Filters from './components/Filters';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import UserAssignModal from './components/UserAssignModal';
import ErrorMessage from './components/ErrorMessage';
import { Task, CreateTaskInput, TaskStatus } from './types';

function AppContent() {
  const {
    tasks,
    loading,
    error,
    filters,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    setFilters,
    clearError,
    assignUser: updateTaskUser,
  } = useTasks();

  const { users } = useUsers();
  const { isOpen: isFormOpen, openModal: openForm, closeModal: closeForm } = useModal();
  const { isOpen: isAssignModalOpen, openModal: openAssignModal, closeModal: closeAssignModal } = useModal();
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [selectedTaskForAssign, setSelectedTaskForAssign] = useState<Task | undefined>(undefined);

  const handleAddTask = () => {
    setEditingTask(undefined);
    openForm();
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    openForm();
  };

  const handleFormSubmit = async (taskData: CreateTaskInput) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, taskData);
      } else {
        await createTask(taskData);
      }
      closeForm();
      setEditingTask(undefined);
    } catch (err) {
      // Error is handled by context
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
      } catch (err) {
        // Error is handled by context
      }
    }
  };

  const handleStatusChange = async (id: string, status: TaskStatus) => {
    try {
      await updateTaskStatus(id, status);
    } catch (err) {
      // Error is handled by context
    }
  };

  const handleAssignUser = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setSelectedTaskForAssign(task);
      openAssignModal();
    }
  };

  const handleUserAssign = async (userId: string) => {
    if (selectedTaskForAssign) {
      try {
        await updateTaskUser(selectedTaskForAssign.id, userId);
        closeAssignModal();
        setSelectedTaskForAssign(undefined);
      } catch (err) {
        // Error is handled by context
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#898AC4]">
      <Header onAddTask={handleAddTask} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorMessage error={error} onClose={clearError} />

        <Filters filters={filters} onFilterChange={setFilters} />

        <TaskList
          tasks={tasks}
          loading={loading}
          users={users}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onStatusChange={handleStatusChange}
          onAssignUser={handleAssignUser}
        />

        {isFormOpen && (
          <TaskForm
            task={editingTask}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              closeForm();
              setEditingTask(undefined);
            }}
            loading={loading}
          />
        )}

        {isAssignModalOpen && (
          <UserAssignModal
            isOpen={isAssignModalOpen}
            onClose={() => {
              closeAssignModal();
              setSelectedTaskForAssign(undefined);
            }}
            onAssign={handleUserAssign}
            users={users}
            taskTitle={selectedTaskForAssign?.title || ''}
            loading={loading}
          />
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <TaskProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </TaskProvider>
  );
}

export default App;
