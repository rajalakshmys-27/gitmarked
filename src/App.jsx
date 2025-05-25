import { Outlet } from 'react-router';
import Navbar from './components/ui/Navbar.jsx';
import {ThemeProvider} from './context/theme/ThemeContext.jsx';
import {BookmarksProvider} from './context/bookmarks/BookmarksContext.jsx';
import {AuthProvider} from './context/auth/AuthContext.jsx';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BookmarksProvider>
          <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 to-blue-50 dark:from-gray-900 dark:to-gray-800 font-sans transition-colors duration-300">
            <Navbar />
            <main >
              <Outlet />
            </main>
          </div>
        </BookmarksProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
