import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import EmptyState from './components/EmptyState';
import Notification from './components/Notification';
import Modal from './components/Modal';
import { getTasks, createTask, updateTask, deleteTask } from './api/tasks';

export default function App() {
  // State
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    sort: 'newest',
    search: '',
  });

  // Notification helper
  const notify = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setNotifications((prev) => [...prev, { id, message, type }]);
  }, []);

  const dismissNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getTasks(filters);
      setTasks(response.data);
    } catch (error) {
      notify('Failed to load tasks. Is the server running?', 'error');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, notify]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Debounce search
  const [searchTimeout, setSearchTimeout] = useState(null);
  const handleFilterChange = (newFilters) => {
    if (newFilters.search !== filters.search) {
      if (searchTimeout) clearTimeout(searchTimeout);
      const timeout = setTimeout(() => {
        setFilters(newFilters);
      }, 400);
      setSearchTimeout(timeout);
      // Update the input value immediately for UX
      setFilters((prev) => ({ ...prev, search: newFilters.search }));
    } else {
      setFilters(newFilters);
    }
  };

  // Create task
  const handleCreateTask = async (taskData) => {
    try {
      await createTask(taskData);
      notify('Task created successfully! 🎉');
      setShowForm(false);
      fetchTasks();
    } catch (error) {
      const msg = error.data?.errors?.[0]?.message || 'Failed to create task';
      notify(msg, 'error');
    }
  };

  // Update task
  const handleUpdateTask = async (taskData) => {
    try {
      await updateTask(editingTask._id, taskData);
      notify('Task updated successfully! ✅');
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      const msg = error.data?.errors?.[0]?.message || 'Failed to update task';
      notify(msg, 'error');
    }
  };

  // Delete task
  const handleDeleteTask = async () => {
    try {
      await deleteTask(deletingTask._id);
      notify('Task deleted successfully! 🗑️');
      setDeletingTask(null);
      fetchTasks();
    } catch (error) {
      notify('Failed to delete task', 'error');
    }
  };

  // Status change
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
      const statusEmojis = {
        pending: '⏳',
        'in-progress': '🔄',
        completed: '🎉',
      };
      notify(`Task marked as ${newStatus} ${statusEmojis[newStatus]}`);
      fetchTasks();
    } catch (error) {
      notify('Failed to update status', 'error');
    }
  };

  // Open edit form
  const handleEdit = (task) => {
    setEditingTask(task);
  };

  // Open delete confirm
  const handleDeletePrompt = (task) => {
    setDeletingTask(task);
  };

  const hasActiveFilters =
    filters.status !== 'all' ||
    filters.priority !== 'all' ||
    filters.search !== '';

  return (
    <div className="app-container">
      {/* Notifications */}
      <Notification notifications={notifications} onDismiss={dismissNotification} />

      {/* Header */}
      <Header tasks={tasks} />

      {/* Filter Bar */}
      <FilterBar filters={filters} onFilterChange={handleFilterChange} />

      {/* Add Task Button */}
      <button
        className="add-task-btn"
        id="add-task-btn"
        onClick={() => setShowForm(true)}
      >
        <span className="add-task-btn__icon">+</span>
        Add New Task
      </button>

      {/* Task List / Empty / Loading */}
      {loading ? (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      ) : tasks.length > 0 ? (
        <TaskList
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDeletePrompt}
          onStatusChange={handleStatusChange}
        />
      ) : (
        <EmptyState hasFilters={hasActiveFilters} />
      )}

      {/* Task Form Modal (Create) */}
      {showForm && (
        <TaskForm
          onSubmit={handleCreateTask}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Task Form Modal (Edit) */}
      {editingTask && (
        <TaskForm
          onSubmit={handleUpdateTask}
          onClose={() => setEditingTask(null)}
          editingTask={editingTask}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingTask && (
        <Modal
          title="Delete Task"
          message={`Are you sure you want to delete "${deletingTask.title}"? This action cannot be undone.`}
          icon="⚠️"
          confirmLabel="Delete"
          confirmClass="btn--danger"
          onConfirm={handleDeleteTask}
          onCancel={() => setDeletingTask(null)}
        />
      )}
    </div>
  );
}
