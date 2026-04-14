import axios from 'axios';

const oasisApi = axios.create({
  baseURL: 'http://localhost:3000/api'
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