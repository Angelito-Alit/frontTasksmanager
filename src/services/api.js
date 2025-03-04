import axios from 'axios';

const API_URL = 'process.env.REACT_APP_API_URL';
const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
};

export const taskService = {
  getTasks: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },
  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },
  updateTask: async (taskId, taskData) => {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data;
  },
};

export const groupService = {
  getGroups: async () => {
    const response = await api.get('/groups');
    return response.data;
  },
  createGroup: async (groupData) => {
    const response = await api.post('/groups', groupData);
    return response.data;
  },
  getGroupTasks: async (groupId) => {
    const response = await api.get(`/groups/${groupId}/tasks`);
    return response.data;
  },
  createGroupTask: async (groupId, taskData) => {
    const response = await api.post(`/groups/${groupId}/tasks`, taskData);
    return response.data;
  },
  updateGroupTask: async (groupId, taskId, taskData) => {
    const response = await api.put(`/groups/${groupId}/tasks/${taskId}`, taskData);
    return response.data;
  },
  completeGroupTask: async (groupId, taskId) => {
    const response = await api.put(`/groups/${groupId}/tasks/${taskId}/complete`, {});
    return response.data;
  },
  getGroupCollaborators: async (groupId) => {
    const response = await api.get(`/groups/${groupId}/collaborators`);
    return response.data;
  },
  addGroupCollaborator: async (groupId, email) => {
    const response = await api.post(`/groups/${groupId}/collaborators`, { email });
    return response.data;
  },
};

// Añadir servicio de usuario
export const userService = {
  getCurrentUser: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },
  updateUser: async (userId, userData) => {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  },
  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  }
};

export default {
  authService,
  taskService,
  groupService,
  userService
};