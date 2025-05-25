import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../../context/auth/useAuth.js';

export function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
