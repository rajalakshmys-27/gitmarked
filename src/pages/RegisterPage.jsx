import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { signUp, auth } from '../services/auth.js';
import { useAuth } from '../context/auth/useAuth';
import { EyeIcon, EyeOffIcon, GoogleIcon, GithubIcon } from '../icons';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { loginWithGoogle, loginWithGithub } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { user, error: signUpError } = await signUp(email, password, firstName, lastName);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }    
    if (user) {
      navigate('/verify-email');
    }
  };
  const handleSocialSignUp = async (provider) => {
    setError(null);
    const signInMethod = provider === 'google' ? loginWithGoogle : loginWithGithub;
    const success = await signInMethod();
    
    if (success) {
      const user = auth.currentUser;
      if (user) {
        // Check if this is their first sign in (new user)
        const isNewUser = user.metadata.creationTime === user.metadata.lastSignInTime;
        
        if (isNewUser && !user.emailVerified) {
          // For new users, send them to email verification
          navigate('/verify-email');
        } else {
          // For existing users, send them to dashboard
          navigate('/dashboard');
        }
      }
    } else {
      setError(`Failed to sign up with ${provider === 'google' ? 'Google' : 'GitHub'}`);
    }
  };

  const handleGoogleLogin = () => handleSocialSignUp('google');
  const handleGithubLogin = () => handleSocialSignUp('github');

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-2 sm:px-4 md:px-8">
      <div className="w-full max-w-xs sm:max-w-md bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl p-4 sm:p-8 backdrop-blur-lg border border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-900 dark:text-white">Register</h1>
        
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center py-2.5 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              <GoogleIcon />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Google</span>
            </button>
            <button
              type="button"
              onClick={handleGithubLogin}
              className="flex items-center justify-center py-2.5 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              <GithubIcon />
              <span className="ml-2 text-gray-700 dark:text-gray-300">GitHub</span>
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">Or register with email</span>
            </div>
          </div>
        </div>

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
