import { Outlet } from 'react-router';
import Navbar from './components/ui/Navbar.jsx';
import { ThemeProvider } from './context/theme/ThemeContext.jsx';
import { BookmarksProvider } from './context/bookmarks/BookmarksContext.jsx';
import { AuthProvider } from './context/auth/AuthContext.jsx';
import Footer from './components/ui/Footer.jsx';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BookmarksProvider>
          <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 to-blue-50 dark:from-gray-900 dark:to-gray-800 font-sans transition-colors duration-300">
            <Navbar />
            <main className="pt-20 pb-15 px-4 md:px-8 max-w-6xl mx-auto w-full">
              <Outlet />
            </main>
          </div>
          <Footer />
        </BookmarksProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
