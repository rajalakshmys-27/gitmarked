import { Link, useLocation } from 'react-router';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../../context/auth/useAuth';

function Navbar() {
    const location = useLocation();
    const { user, logout } = useAuth();

    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-30 w-[95vw] max-w-6xl rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg border border-gray-200 dark:border-gray-800 shadow-xl px-6 py-3 flex items-center justify-between transition-all duration-500">
            <div className="flex items-center gap-6">
                <Link to="/" className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-fuchsia-500 to-amber-400 dark:from-blue-300 dark:via-fuchsia-400 dark:to-yellow-200 bg-clip-text text-transparent select-none transition-all duration-500">
                    <span className="inline-block align-text-top animate-pulse bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-fuchsia-500 to-amber-400 dark:from-blue-300 dark:via-fuchsia-400 dark:to-yellow-200">G</span>it
                    <span className="inline-block align-text-top animate-pulse delay-150 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-fuchsia-500 to-amber-400 dark:from-blue-300 dark:via-fuchsia-400 dark:to-yellow-200">M</span>arked
                </Link>
                {user && (
                    <>
                        <Link to="/dashboard"
                            className={`px-4 py-1 rounded-full text-base font-semibold transition-colors duration-300 ${location.pathname === '/dashboard'
                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-sm'
                                : 'text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
                                }`}
                        >
                            Dashboard
                        </Link>
                        <Link to="/bookmarks"
                            className={`px-4 py-1 rounded-full text-base font-semibold transition-colors duration-300 ${location.pathname === '/bookmarks'
                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-sm'
                                : 'text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
                                }`}
                        >
                            Bookmarks
                        </Link>
                    </>
                )}
            </div>
            <div className="flex items-center gap-3">
                {user ? (
                    <div className="flex items-center gap-3 bg-gray-100/60 dark:bg-gray-800/60 px-3 py-1 rounded-full shadow-inner">
                        <span className="text-gray-700 dark:text-gray-200 text-sm">
                            Welcome, <span className="font-semibold text-blue-600 dark:text-blue-400">{user.email}</span>
                        </span>
                        <button
                            onClick={logout}
                            className="px-4 py-1 rounded-full text-sm font-semibold text-gray-700 dark:text-gray-200 bg-white/80 dark:bg-gray-900/80 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 shadow transition-colors duration-300"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="px-4 py-1 rounded-full text-base font-semibold text-gray-700 dark:text-gray-200 bg-white/80 dark:bg-gray-900/80 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 shadow transition-colors duration-300"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="px-4 py-1 rounded-full text-base font-semibold text-gray-700 dark:text-gray-200 bg-white/80 dark:bg-gray-900/80 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 shadow transition-colors duration-300"
                        >
                            Register
                        </Link>
                    </>
                )}
                <div className="ml-2">
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
