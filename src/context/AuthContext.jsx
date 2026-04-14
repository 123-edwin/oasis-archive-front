import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import oasisApi from '../api/oasisApi';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('checking'); // 'checking', 'authenticated', 'not-authenticated'

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return setStatus('not-authenticated');

    try {
      // Opcional: Crear un endpoint /auth/renew para validar el token
      // Por ahora, si hay token, asumimos autenticado o validamos con la primera carga
      setStatus('authenticated');
    } catch (error) {
      console.error('Error checking auth token:', error);
      localStorage.clear();
      setStatus('not-authenticated');
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkAuthToken();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await oasisApi.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setStatus('authenticated');
      return { ok: true };
    } catch (error) {
      return { ok: false, msg: error.response.data?.message || 'Error en login' };
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setStatus('not-authenticated');
  };

  return (
    <AuthContext.Provider value={{ status, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};