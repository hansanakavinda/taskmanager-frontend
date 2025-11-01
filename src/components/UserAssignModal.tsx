import React, { useState } from 'react';
import { User } from '../types';

interface UserAssignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (userId: string) => void;
  users: User[];
  taskTitle: string;
  loading?: boolean;
}

const UserAssignModal: React.FC<UserAssignModalProps> = ({
  isOpen,
  onClose,
  onAssign,
  users,
  taskTitle,
  loading = false
}) => {
  const [selectedUserId, setSelectedUserId] = useState<string>('');

  if (!isOpen) return null;

  const handleAssign = () => {
    if (selectedUserId) {
      onAssign(selectedUserId);
      setSelectedUserId('');
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedUserId('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Assign User to Task
            </h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-600">
            Select a user to assign to: <span className="font-medium">"{taskTitle}"</span>
          </p>
        </div>

        <div className="px-6 py-4">
          {users.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No users available</p>
          ) : (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose User:
              </label>
              <div className="max-h-64 overflow-y-auto">
                {users.map((user) => (
                  <label
                    key={user.id}
                    className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedUserId === user.id ? 'bg-blue-50 border border-blue-200' : 'border border-transparent'
                    }`}
                  >
                    <input
                      type="radio"
                      name="user"
                      value={user.id}
                      checked={selectedUserId === user.id}
                      onChange={(e) => setSelectedUserId(e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <div className="ml-3 flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end space-x-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedUserId || loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Assigning...' : 'Assign User'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAssignModal;