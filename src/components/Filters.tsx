import React from 'react';
import { TaskStatus, TaskPriority, TaskFilters } from '../types';

interface FiltersProps {
  filters: TaskFilters;
  onFilterChange: (filters: TaskFilters) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
  const handleStatusChange = (status: string) => {
    onFilterChange({
      ...filters,
      status: status === 'ALL' ? undefined : (status as TaskStatus),
    });
  };

  const handlePriorityChange = (priority: string) => {
    onFilterChange({
      ...filters,
      priority: priority === 'ALL' ? undefined : (priority as TaskPriority),
    });
  };

  const handleSearchChange = (search: string) => {
    onFilterChange({
      ...filters,
      search: search || undefined,
    });
  };

  return (
    <div className="bg-[#C0C9EE] rounded-lg shadow-sm p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              id="search"
              value={filters.search || ''}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            id="status"
            value={filters.status || 'ALL'}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="ALL">All Statuses</option>
            <option value={TaskStatus.PENDING}>Pending</option>
            <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
            <option value={TaskStatus.COMPLETED}>Completed</option>
            <option value={TaskStatus.CANCELLED}>Cancelled</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
            Priority
          </label>
          <select
            id="priority"
            value={filters.priority || 'ALL'}
            onChange={(e) => handlePriorityChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="ALL">All Priorities</option>
            <option value={TaskPriority.LOW}>Low</option>
            <option value={TaskPriority.MEDIUM}>Medium</option>
            <option value={TaskPriority.HIGH}>High</option>
            <option value={TaskPriority.URGENT}>Urgent</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
