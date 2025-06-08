import { useState } from 'react';
import { Link } from 'react-router';
import { signUp, sendVerificationEmail } from '../services/auth.js';
import { EyeIcon, EyeOffIcon, MailIcon } from '../icons';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [verificationSent, setVerificationSent] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { user, error: signUpError } = await signUp(email, password, firstName, lastName);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (user) {
      setVerificationSent(true);
    }
  };

  const handleResendVerification = async () => {
    setResendLoading(true);
    setError(null);
    const { success, error } = await sendVerificationEmail();
    if (!success && error) setError(error.message);
    setResendLoading(false);
  };

  if (verificationSent) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-2 sm:px-4 md:px-8">
        <div className="w-full max-w-xs sm:max-w-md bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl p-4 sm:p-8 backdrop-blur-lg border border-gray-200 dark:border-gray-800 flex flex-col items-center">
          <MailIcon className="w-16 h-16 text-blue-500 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">Verify your email</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-4">A verification link has been sent to <span className="font-semibold">{email}</span>. Please check your inbox and verify your email to continue.</p>
          <button
            type="button"
            onClick={handleResendVerification}
            disabled={resendLoading}
            className="w-full py-2 px-4 rounded-md bg-blue-600 dark:bg-blue-500 text-white font-semibold shadow hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-60 mb-2"
          >
            {resendLoading ? 'Resending...' : 'Resend Verification Email'}
          </button>
          <Link to="/login" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm">Back to Login</Link>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-2 sm:px-4 md:px-8">
      <div className="w-full max-w-xs sm:max-w-md bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl p-4 sm:p-8 backdrop-blur-lg border border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-900 dark:text-white">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              required
            />
          </div>
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
            Register
          </button>
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
