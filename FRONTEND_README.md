# Task Manager Frontend

A modern, responsive task management application built with React, TypeScript, and Tailwind CSS.

## Features

- ✨ Create, read, update, and delete tasks
- 🔍 Filter tasks by status, priority, and search
- 📱 Fully responsive design for all devices
- 🎨 Modern UI with Tailwind CSS
- 🔔 Loading states and error handling
- 📊 Task status tracking (To Do, In Progress, Completed)
- ⚡ Priority levels (Low, Medium, High)
- 📅 Due date tracking with overdue notifications

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Context API** - State management

## Project Structure

```
src/
├── components/         # React components
│   ├── Header.tsx
│   ├── Filters.tsx
│   ├── TaskList.tsx
│   ├── TaskCard.tsx
│   ├── TaskForm.tsx
│   ├── LoadingSpinner.tsx
│   └── ErrorMessage.tsx
├── context/           # React Context for state management
│   └── TaskContext.tsx
├── hooks/             # Custom React hooks
│   ├── useTasks.ts
│   └── useModal.ts
├── services/          # API service layer
│   └── api.ts
├── types/             # TypeScript type definitions
│   ├── task.ts
│   ├── api.ts
│   └── index.ts
└── utils/             # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on http://localhost:3000

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```bash
REACT_APP_API_URL=http://localhost:3000/api
```

3. Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## Available Scripts

### `npm start`

Runs the app in development mode.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## API Integration

The frontend connects to a REST API with the following endpoints:

- `GET /api/tasks` - Get all tasks (with optional filters)
- `GET /api/tasks/:id` - Get a single task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `PATCH /api/tasks/:id/status` - Update task status

## Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
