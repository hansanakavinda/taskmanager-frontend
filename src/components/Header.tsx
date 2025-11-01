import React from 'react';

interface HeaderProps {
  onAddTask: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddTask }) => {
  return (
    <header className="bg-[#A2AADB] shadow-sm ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-[#A7C1A8] p-2 rounded-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="black"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
              <p className="text-sm text-gray-800">Organize and track your tasks</p>
            </div>
          </div>
          <button
            onClick={onAddTask}
            className="flex items-center space-x-2 bg-[#A7C1A8] hover:bg-[#CAE8BD] px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="black" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="font-medium text-gray-900">Add Task</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
