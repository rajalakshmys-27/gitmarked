import { createBrowserRouter } from 'react-router';
import Layout from '../App';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import Bookmarks from '../pages/BookmarksPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { PublicOnlyRoute } from '../components/auth/PublicOnlyRoute';

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        index: true,
        element: (
          <PublicOnlyRoute>
            <HomePage />
          </PublicOnlyRoute>
        ),
      },
      {
        path: 'login',
        element: (
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <PublicOnlyRoute>
            <RegisterPage />
          </PublicOnlyRoute>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'bookmarks',
        element: (
          <ProtectedRoute>
            <Bookmarks />
          </ProtectedRoute>
        )
      },
    ],
  },
]);

export default router;
