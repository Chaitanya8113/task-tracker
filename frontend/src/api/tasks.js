const API_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Generic fetch wrapper with error handling
 */
async function request(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || 'Something went wrong');
    error.data = data;
    error.status = response.status;
    throw error;
  }

  return data;
}

/**
 * Get all tasks with optional filters
 */
export async function getTasks(filters = {}) {
  const params = new URLSearchParams();
  if (filters.status) params.append('status', filters.status);
  if (filters.priority) params.append('priority', filters.priority);
  if (filters.sort) params.append('sort', filters.sort);
  if (filters.search) params.append('search', filters.search);

  const query = params.toString();
  return request(`/tasks${query ? `?${query}` : ''}`);
}

/**
 * Get a single task by ID
 */
export async function getTask(id) {
  return request(`/tasks/${id}`);
}

/**
 * Create a new task
 */
export async function createTask(taskData) {
  return request('/tasks', {
    method: 'POST',
    body: JSON.stringify(taskData),
  });
}

/**
 * Update an existing task
 */
export async function updateTask(id, taskData) {
  return request(`/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(taskData),
  });
}

/**
 * Delete a task
 */
export async function deleteTask(id) {
  return request(`/tasks/${id}`, {
    method: 'DELETE',
  });
}
