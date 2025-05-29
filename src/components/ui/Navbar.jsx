import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../../context/auth/useAuth';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const { user, logout } = useAuth();

    // Hide menu when route changes
    React.useEffect(() => { setMenuOpen(false); }, [location.pathname]);

    return (
        <nav className="fixed top-2 md:top-4 left-1/2 -translate-x-1/2 z-30 w-[98vw] md:w-[95vw] max-w-full md:max-w-6xl rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border border-gray-200 dark:border-gray-800 shadow-xl px-2 md:px-6 py-2 md:py-3 flex items-center justify-between transition-all duration-500">
            {/* Mobile/Tablet: Centered layout with heading, theme, hamburger */}
            <div className="flex flex-1 items-center justify-between md:hidden w-full">
                <Link to="/" className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-fuchsia-500 to-amber-400 dark:from-blue-300 dark:via-fuchsia-400 dark:to-yellow-200 bg-clip-text text-transparent select-none transition-all duration-500">
                    <span className="inline-block align-text-top animate-pulse bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-fuchsia-500 to-amber-400 dark:from-blue-300 dark:via-fuchsia-400 dark:to-yellow-200">G</span>it
                    <span className="inline-block align-text-top animate-pulse delay-150 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-fuchsia-500 to-amber-400 dark:from-blue-300 dark:via-fuchsia-400 dark:to-yellow-200">M</span>arked
                </Link>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <button
                        className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        aria-label="Open menu"
                        onClick={() => setMenuOpen((v) => !v)}
                    >
                        <svg className="w-7 h-7 text-blue-700 dark:text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
            {/* Desktop nav and theme toggle */}
            <div className="hidden md:flex items-center gap-3 w-full justify-between">
                <Link to="/" className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-fuchsia-500 to-amber-400 dark:from-blue-300 dark:via-fuchsia-400 dark:to-yellow-200 bg-clip-text text-transparent select-none transition-all duration-500">
                    <span className="inline-block align-text-top animate-pulse bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-fuchsia-500 to-amber-400 dark:from-blue-300 dark:via-fuchsia-400 dark:to-yellow-200">G</span>it
                    <span className="inline-block align-text-top animate-pulse delay-150 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-fuchsia-500 to-amber-400 dark:from-blue-300 dark:via-fuchsia-400 dark:to-yellow-200">M</span>arked
                </Link>
                <div className="flex items-center gap-3">
                    {user ? (
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
                        </>
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
            </div>
            {/* Mobile/tablet menu drawer */}
            {menuOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div className="fixed inset-0 bg-black/80" onClick={() => setMenuOpen(false)}></div>
                    <div className="fixed inset-0 bg-white dark:bg-gray-900 shadow-xl flex flex-col gap-8">
                        <button
                            className="absolute top-4 right-4 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            aria-label="Close menu"
                            onClick={() => setMenuOpen(false)}
                        >
                            <svg className="w-7 h-7 text-blue-700 dark:text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="flex flex-col gap-6 mt-16 pt-4 px-6 bg-gray-100/90 dark:bg-gray-800/90">
                            {user ? (
                                <>
                                    <div className="flex flex-row mt-2 items-center justify-between">
                                        <span className="text-gray-700 dark:text-gray-200 text-base">Welcome, <span className="font-semibold text-blue-600 dark:text-blue-400">{user.email}</span></span>
                                        <button onClick={logout} className="px-4 py-2 rounded text-base font-semibold text-gray-700 dark:text-gray-200 bg-white/80 dark:bg-gray-900/80 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 shadow transition-colors duration-300">Logout</button>
                                    </div>
                                    <Link to="/dashboard" className={`block px-4 py-3 rounded text-lg font-semibold ${location.pathname === '/dashboard' ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'}`}>Dashboard</Link>
                                    <Link to="/bookmarks" className={`block px-4 py-3 rounded text-lg font-semibold ${location.pathname === '/bookmarks' ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'}`}>Bookmarks</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className={`block px-4 py-3 rounded text-lg font-semibold transition-colors duration-300 ${location.pathname === '/login' ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'}`}>Login</Link>
                                    <Link to="/register" className={`block px-4 py-3 rounded text-lg font-semibold transition-colors duration-300 ${location.pathname === '/register' ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'}`}>Register</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
