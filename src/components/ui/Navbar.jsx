import { Link, useLocation } from 'react-router';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../../context/auth/useAuth';

function Navbar() {
    const location = useLocation();
    const { user, logout } = useAuth();

    return (
        <nav className="flex items-center justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur shadow-md px-8 py-4 sticky top-0 z-10 w-full">
            <div className="flex items-center gap-8">
                <Link to="/" className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-fuchsia-500 to-amber-400 dark:from-blue-300 dark:via-fuchsia-400 dark:to-yellow-200 bg-clip-text text-transparent drop-shadow-lg shadow-blue-100 dark:shadow-blue-900 py-1 px-2 rounded-xl select-none transition-all duration-500">
                    <span className="inline-block align-text-top animate-pulse bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-fuchsia-500 to-amber-400 dark:from-blue-300 dark:via-fuchsia-400 dark:to-yellow-200">G</span>it
                    <span className="inline-block align-text-top animate-pulse delay-150 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-fuchsia-500 to-amber-400 dark:from-blue-300 dark:via-fuchsia-400 dark:to-yellow-200">M</span>arked
                </Link>
                {user && (
                    <>
                        <Link to="/dashboard"
                            className={`text-lg font-medium transition-colors duration-300 ${location.pathname === '/dashboard'
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                                }`}
                        >
                            Dashboard
                        </Link>
                        <Link to="/bookmarks"
                            className={`text-lg font-medium transition-colors duration-300 ${location.pathname === '/bookmarks'
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                                }`}
                        >
                            Bookmarks
                        </Link>
                    </>
                )}
            </div>
            <div className="flex items-center gap-2">
                {user ? (
                    <div className="flex items-center gap-4">                        <span className="text-gray-700 dark:text-gray-200">
                        Welcome, <span className="font-medium text-blue-600 dark:text-blue-400">{user.email}</span>
                    </span>
                        <button
                            onClick={logout}
                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="px-4 py-2 text-md font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="px-4 py-2 text-md font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                        >
                            Register
                        </Link>
                    </>
                )}
                <ThemeToggle />
            </div>
        </nav>
    );
}

export default Navbar;
