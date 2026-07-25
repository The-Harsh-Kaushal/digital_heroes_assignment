import axios from 'axios';
import { getStoredToken } from '../utils/authStorage';

const api = axios.create({
  baseURL: "/api/v1",
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = getStoredToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
