import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router';
import { useAuth } from '../context/auth/useAuth';
import { sendResetPasswordEmail } from '../services/auth.js';
import { Dialog, DialogTitle } from '@headlessui/react';
import { EyeIcon, EyeOffIcon } from '../icons';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [showForgot, setShowForgot] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotStatus, setForgotStatus] = useState('');
    const [forgotLoading, setForgotLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const success = await login(email, password);
        if (success) {
            // Redirect to the page they were trying to access, or dashboard
            const from = location.state?.from?.pathname || '/dashboard';
            navigate(from);
        } else {
            setError('Invalid email or password');
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setForgotStatus('');
        setForgotLoading(true);
        const { success, error } = await sendResetPasswordEmail(forgotEmail);
        if (success) {
            setForgotStatus('A password reset link has been sent to your email.');
        } else {
            setForgotStatus(error?.message || 'Failed to send reset email.');
        }
        setForgotLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-2 sm:px-4">
            <div className="w-full max-w-xs sm:max-w-md bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl p-4 sm:p-8 backdrop-blur-lg border border-gray-200 dark:border-gray-800">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-900 dark:text-white">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 mt-1"
                            >
                                {showPassword ? (
                                    <EyeOffIcon />
                                ) : (
                                    <EyeIcon />
                                )}
                            </button>
                        </div>
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}
                    <button
                        type="submit"
                        className="w-full py-3 px-6 rounded-full bg-blue-600 dark:bg-blue-500 text-white font-semibold text-base shadow hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    >
                        Login
                    </button>
                    <div className="flex justify-between items-center">
                        <div className="text-sm">
                            <button type="button" onClick={() => setShowForgot(true)} className="text-blue-600 hover:underline dark:text-blue-400">Forgot Password?</button>
                        </div>
                    </div>
                    <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                            Register here
                        </Link>
                    </div>
                </form>
            </div>
            {/* Forgot Password Modal */}
            <Dialog open={showForgot} onClose={() => setShowForgot(false)} className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4">
                    <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
                    <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 w-full max-w-md mx-auto z-20">
                        <DialogTitle className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Reset Password</DialogTitle>
                        <form onSubmit={handleForgotPassword} className="space-y-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={forgotEmail}
                                onChange={e => setForgotEmail(e.target.value)}
                                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {forgotStatus && <div className={`text-sm ${forgotStatus.includes('sent') ? 'text-green-600' : 'text-red-500'}`}>{forgotStatus}</div>}
                            <div className="flex gap-2 justify-end">
                                <button type="button" onClick={() => setShowForgot(false)} className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600">Cancel</button>
                                <button type="submit" disabled={forgotLoading} className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60">
                                    {forgotLoading ? 'Sending...' : 'Send Reset Link'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default LoginPage;
