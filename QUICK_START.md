# Task Manager Frontend - Quick Start Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file (copy from `.env.example`):
```env
REACT_APP_API_URL=http://localhost:3000/api
```

### 3. Start Development Server
```bash
npm start
```

**Note**: If port 3000 is already in use (by backend), the app will ask to run on a different port. Press 'Y' to continue.

The app will open automatically at http://localhost:3000 (or the next available port).

---

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── Header.tsx
│   │   ├── Filters.tsx
│   │   ├── TaskList.tsx
│   │   ├── TaskCard.tsx
│   │   ├── TaskForm.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
│   ├── context/
│   │   └── TaskContext.tsx    # State management
│   ├── hooks/
│   │   ├── useTasks.ts        # Tasks hook
│   │   └── useModal.ts        # Modal hook
│   ├── services/
│   │   └── api.ts             # API client
│   ├── types/
│   │   ├── task.ts            # Task types
│   │   ├── api.ts             # API types
│   │   └── index.ts
│   ├── App.tsx                # Main app component
│   └── index.tsx              # Entry point
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
└── package.json
```

---

## 🎨 Features Implemented

### ✅ Components
- **Header**: App title and "Add Task" button
- **Filters**: Search, status filter, priority filter
- **TaskList**: Grid display of tasks with empty/loading states
- **TaskCard**: Individual task with actions and status
- **TaskForm**: Modal form for create/edit
- **LoadingSpinner**: Animated loading indicator
- **ErrorMessage**: Error display with dismiss

### ✅ State Management
- Context API for global state
- Custom hooks for reusable logic
- Automatic data fetching
- Filter-based data updates

### ✅ API Integration
- Axios HTTP client
- Full CRUD operations
- Error handling
- Type-safe responses

### ✅ Responsive Design
- Mobile-first approach
- Tablet breakpoint (768px)
- Desktop breakpoint (1024px)
- Tailwind CSS utilities

---

## 🔧 Available Scripts

### `npm start`
Runs the app in development mode at http://localhost:3000

### `npm test`
Launches the test runner

### `npm run build`
Builds the app for production in the `build/` folder

### `npm run eject`
⚠️ One-way operation - ejects from Create React App

---

## 🌐 API Endpoints Expected

The frontend expects these backend endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks (supports query params) |
| GET | `/api/tasks/:id` | Get single task |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| PATCH | `/api/tasks/:id/status` | Update task status |

### Query Parameters for GET /api/tasks
- `status` - Filter by status (TODO, IN_PROGRESS, COMPLETED)
- `priority` - Filter by priority (LOW, MEDIUM, HIGH)
- `search` - Search in title/description

---

## 📊 Task Data Structure

```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: string;  // ISO date string
  createdAt: string;
  updatedAt: string;
}
```

---

## 🎯 User Flow

1. **View Tasks**: Homepage displays all tasks in a grid
2. **Filter**: Use filters to narrow down tasks
3. **Search**: Type to search in titles/descriptions
4. **Add Task**: Click "Add Task" button → Fill form → Submit
5. **Edit Task**: Click "Edit" on a task card → Modify → Update
6. **Delete Task**: Click "Delete" → Confirm → Task removed
7. **Change Status**: Use dropdown on task card for quick update

---

## 🎨 Color Scheme

### Status Colors
- **TODO**: Gray (`bg-gray-100`)
- **IN_PROGRESS**: Blue (`bg-blue-100`)
- **COMPLETED**: Green (`bg-green-100`)

### Priority Colors
- **LOW**: Green (`bg-green-100`)
- **MEDIUM**: Yellow (`bg-yellow-100`)
- **HIGH**: Red (`bg-red-100`)

### Brand Colors
- **Primary**: Blue shades (`primary-500` to `primary-900`)

---

## 🐛 Troubleshooting

### Port 3000 already in use
If your backend is running on port 3000, React will prompt to use port 3001. Press 'Y' to accept.

### Tailwind classes not working
Make sure `tailwind.config.js` and `postcss.config.js` are properly configured.

### API connection issues
1. Check `.env` file has correct `REACT_APP_API_URL`
2. Verify backend is running
3. Check browser console for CORS errors

### TypeScript errors
Run `npm install` to ensure all types are installed.

---

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (1 column)
- **Tablet**: 768px - 1023px (2 columns)
- **Desktop**: ≥ 1024px (3 columns)

---

## ✨ Bonus Features Included

- Overdue date highlighting
- Loading states on all async actions
- Error messages with dismiss
- Confirmation dialogs for destructive actions
- Smooth animations and transitions
- Keyboard-friendly forms
- Accessible color contrasts

---

## 📚 Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Context API** - State management
- **React Hooks** - Component logic

---

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized build in the `build/` folder.

### Deployment Options
- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop `build/` folder
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3**: Upload `build/` contents

---

## 📝 Environment Variables

Create `.env` file in root:

```env
# Backend API URL
REACT_APP_API_URL=http://localhost:3000/api

# Optional: Custom port (if 3000 is taken)
PORT=3001
```

---

## 🎉 All Phase 4 Requirements Completed!

✅ 4.1 Project Setup - React + TypeScript  
✅ 4.2 Folder Structure - Organized architecture  
✅ 4.3 Components - All UI components built  
✅ 4.4 State Management - Context API implemented  
✅ 4.5 API Integration - Full REST API connection  
✅ 4.6 Loading & Error States - Complete UX feedback  
✅ 4.7 Responsive Design - Tailwind CSS for all devices  

**Ready for production! 🚀**
