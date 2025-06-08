import { useState, useCallback, useEffect } from 'react';
import { AuthContext } from './auth-context.js';
import { signIn, logOut, subscribeToAuthChanges, signInWithGoogle, signInWithGithub } from '../../services/auth.js';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = subscribeToAuthChanges((user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const { error } = await signIn(email, password);
      return !error;
    } catch {
      return false;
    }
  }, []);
  const loginWithGoogle = useCallback(async () => {
    try {
      const { error } = await signInWithGoogle();
      return !error;
    } catch {
      return false;
    }
  }, []);
  const loginWithGithub = useCallback(async () => {
    try {
      const { error } = await signInWithGithub();
      return !error;
    } catch {
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    await logOut();
  }, []);

  const updateUser = useCallback((newUser) => {
    setUser(newUser);
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, loginWithGithub, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
