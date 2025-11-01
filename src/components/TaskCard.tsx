import React from 'react';
import { Task, TaskStatus, TaskPriority, User } from '../types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onAssignUser?: (taskId: string) => void; // New prop for assign user functionality
  users?: User[]; // Optional users array to find assigned user
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onEdit, 
  onDelete, 
  onStatusChange, 
  onAssignUser,
  users = []
}) => {
  const statusColors = {
    [TaskStatus.PENDING]: 'bg-gray-100 text-gray-800',
    [TaskStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
    [TaskStatus.COMPLETED]: 'bg-green-100 text-green-800',
    [TaskStatus.CANCELLED]: 'bg-red-100 text-red-800',
  };

  const priorityColors = {
    [TaskPriority.LOW]: 'bg-green-100 text-green-800',
    [TaskPriority.MEDIUM]: 'bg-yellow-100 text-yellow-800',
    [TaskPriority.HIGH]: 'bg-red-100 text-red-800',
    [TaskPriority.URGENT]: 'bg-purple-100 text-purple-800',
  };

  const statusLabels = {
    [TaskStatus.PENDING]: 'Pending',
    [TaskStatus.IN_PROGRESS]: 'In Progress',
    [TaskStatus.COMPLETED]: 'Completed',
    [TaskStatus.CANCELLED]: 'Cancelled',
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== TaskStatus.COMPLETED;

  // Find assigned user
  const assignedUser = task.user ? task.user : null;

  return (
    <div className="bg-[#F4F8D3] rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
            
            {/* Assigned User or Add User Button */}
            {assignedUser ? (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                {assignedUser.firstName} {assignedUser.lastName}
              </span>
            ) : (
              onAssignUser && (
                <button
                  onClick={() => onAssignUser(task.id)}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Assign User
                </button>
              )
            )}
          </div>
          
          {task.description && (
            <p className="text-gray-700 text-sm line-clamp-2">{task.description}</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
          {statusLabels[task.status]}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
        {task.dueDate && (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            isOverdue ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
          }`}>
            Due: {formatDate(task.dueDate)}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-600 hover:text-red-700 font-medium text-sm"
          >
            Delete
          </button>
        </div>

        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
          className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value={TaskStatus.PENDING}>Pending</option>
          <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
          <option value={TaskStatus.COMPLETED}>Completed</option>
          <option value={TaskStatus.CANCELLED}>Cancelled</option>
        </select>
      </div>
    </div>
  );
};

export default TaskCard;