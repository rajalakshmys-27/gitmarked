import { Navigate } from 'react-router';
import { useAuth } from '../../context/auth/useAuth.js';

export function PublicOnlyRoute({ children }) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
