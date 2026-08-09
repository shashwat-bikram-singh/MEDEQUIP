import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/client';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore auth state from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('medequip_token');
    const savedUser = localStorage.getItem('medequip_user');
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('medequip_token');
        localStorage.removeItem('medequip_user');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password });
    const data = response.data;
    localStorage.setItem('medequip_token', data.token);
    const userData = {
      id: data.userId,
      firstName: data.firstName,
      lastName: data.lastName,
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      role: data.role,
    };
    localStorage.setItem('medequip_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  }, []);

  const signup = useCallback(async (firstName, lastName, email, phone, password) => {
    const response = await api.post('/api/auth/register', {
      firstName,
      lastName,
      email,
      phone: phone || undefined,
      password,
    });
    const data = response.data;
    localStorage.setItem('medequip_token', data.token);
    const userData = {
      id: data.userId,
      firstName: data.firstName,
      lastName: data.lastName,
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      role: data.role,
    };
    localStorage.setItem('medequip_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('medequip_token');
    localStorage.removeItem('medequip_user');
    setUser(null);
  }, []);

  const isAdmin = user?.role === 'ADMIN';

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoggedIn: !!user, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
