import { useState, useCallback } from 'react';
import { AuthContext } from './auth-context.js';

// For demo purposes only - in a real app, this would be validated against a backend
const DEMO_USER = {
  username: 'demo',
  password: 'demo123'
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = useCallback((username, password) => {
    if (username === DEMO_USER.username && password === DEMO_USER.password) {
      setUser({ username });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
