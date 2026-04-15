import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const oasisApi = axios.create({
  baseURL: apiUrl
});

// Interceptor para añadir el token automáticamente si existe
oasisApi.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-token'] = token;
  }
  return config;
});

export default oasisApi;