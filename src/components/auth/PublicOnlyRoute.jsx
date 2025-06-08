import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../../context/auth/useAuth.js';

export function PublicOnlyRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  
  if (user) {
    // Check if we're on the registration page
    if (location.pathname === '/register') {
      return <Navigate to="/verify-email" replace />;
    }
    // For other public routes (like login), redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
