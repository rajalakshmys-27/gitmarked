import { Link, useLocation } from 'react-router';
import ThemeToggle from './ThemeToggle';

function Navbar() {
    const location = useLocation();
    return (
        <nav className="flex items-center justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur shadow-md px-8 py-4 sticky top-0 z-10 w-full">
            <div className="flex items-center gap-8">
                <Link to="/" className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-fuchsia-500 to-amber-400 dark:from-blue-300 dark:via-fuchsia-400 dark:to-yellow-200 bg-clip-text text-transparent drop-shadow-lg shadow-blue-100 dark:shadow-blue-900 py-1 px-2 rounded-xl select-none transition-all duration-500">
                    <span className="inline-block align-text-top animate-pulse bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-fuchsia-500 to-amber-400 dark:from-blue-300 dark:via-fuchsia-400 dark:to-yellow-200">G</span>it
                    <span className="inline-block align-text-top animate-pulse delay-150 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-fuchsia-500 to-amber-400 dark:from-blue-300 dark:via-fuchsia-400 dark:to-yellow-200">M</span>arked
                </Link>
                <Link to="/bookmarks"
                    className={`text-lg font-medium transition-colors duration-300 ${location.pathname === '/bookmarks'
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                        }`}
                >
                    Bookmarks
                </Link>
            </div>
            <ThemeToggle />
        </nav>
    );
}

export default Navbar;
