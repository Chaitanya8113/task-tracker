# Task Tracker — MERN Stack

A modern, full-stack task management application built with **MongoDB**, **Express.js**, **React.js**, and **Node.js**.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### Core (CRUD)
- ✅ **Create** tasks with title, description, priority, status, and due date
- ✅ **View** all tasks with live statistics
- ✅ **Update** tasks (edit details or quick-toggle status)
- ✅ **Delete** tasks with confirmation modal

### Bonus Features
- 🔍 **Search** — real-time search across titles and descriptions
- 🎯 **Filter** — by status (pending, in-progress, completed) and priority (low, medium, high)
- 📊 **Sort** — by newest, oldest, due date, priority, or title
- 🔔 **Toast Notifications** — success/error feedback on every action
- 🧩 **Reusable Components** — TaskCard, Modal, Notification, EmptyState
- 🔐 **Environment Variables** — `.env` for MongoDB URI and API URL
- 📱 **Responsive UI** — mobile-first, works on all screen sizes
- ⚡ **Dynamic Updates** — no page refresh needed
- ✅ **Form Validation** — client-side + server-side (express-validator)

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Validation | express-validator |
| Styling | Vanilla CSS (dark theme, glassmorphism) |

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ 
- MongoDB Atlas account (free tier) — [Create one here](https://www.mongodb.com/atlas)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd task-tracker
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create/update `.env`:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/task-tracker?retryWrites=true&w=majority
```

Start the server:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
```

Start the dev server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Get all tasks (supports `?status=`, `?priority=`, `?sort=`, `?search=`) |
| `GET` | `/api/tasks/:id` | Get a single task |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

## 📦 Deployment

### Backend (Render.com)
1. Create a new **Web Service** on [Render](https://render.com)
2. Connect your GitHub repo
3. Set **Root Directory**: `backend`
4. Set **Build Command**: `npm install`
5. Set **Start Command**: `node server.js`
6. Add environment variable: `MONGO_URI`

### Frontend (Vercel)
1. Create a new project on [Vercel](https://vercel.com)
2. Connect your GitHub repo
3. Set **Root Directory**: `frontend`
4. Set **Framework Preset**: Vite
5. Add environment variable: `VITE_API_URL=https://your-backend-url.onrender.com/api`

## 📁 Project Structure

```
task-tracker/
├── backend/
│   ├── server.js
│   ├── .env
│   ├── models/Task.js
│   ├── routes/tasks.js
│   └── middleware/validation.js
│
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── api/tasks.js
│   │   └── components/
│   │       ├── Header.jsx
│   │       ├── TaskForm.jsx
│   │       ├── TaskCard.jsx
│   │       ├── TaskList.jsx
│   │       ├── FilterBar.jsx
│   │       ├── Notification.jsx
│   │       ├── Modal.jsx
│   │       └── EmptyState.jsx
│
└── README.md
```

## 📄 License

MIT
