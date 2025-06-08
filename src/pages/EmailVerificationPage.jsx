import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { sendVerificationEmail } from '../services/auth.js';
import { MailIcon, VerificationIcon } from '../icons';
import { useAuth } from '../context/auth/useAuth';

const EmailVerificationPage = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [resending, setResending] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isVerified, setIsVerified] = useState(user?.emailVerified);
  const [showVerificationSuccess, setShowVerificationSuccess] = useState(false);

  // Check email verification status periodically
  useEffect(() => {
    if (!user || isVerified) return;

    const interval = setInterval(async () => {
      try {
        await user.reload();
        if (user.emailVerified) {
          setIsVerified(true);
          setShowVerificationSuccess(true);
          updateUser({ ...user, emailVerified: true });
          // Show success message for 4 seconds then redirect to profile
          setTimeout(() => {
            navigate('/profile');
          }, 4000);
        }
      } catch {
        // Ignore errors during polling
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [user, isVerified, updateUser, navigate]);

  const handleResendVerification = async () => {
    setResending(true);
    setError(null);
    const { success, error } = await sendVerificationEmail();
    if (success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError(error?.message || 'Failed to send verification email.');
    }
    setResending(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-50 to-fuchsia-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl p-8 backdrop-blur-lg border border-gray-200 dark:border-gray-800">
        <div className="flex flex-col items-center justify-center">
          {showVerificationSuccess ? (
            <>
              <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-6">
                <VerificationIcon className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Email Verified!</h1>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                Your email has been successfully verified. Redirecting to your profile...
              </p>
            </>
          ) : (
            <>
              <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-4xl mb-6">
                <MailIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Verify Your Email</h1>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
              </p>
              <div className="flex flex-col w-full gap-3">
                <button
                  onClick={handleResendVerification}
                  disabled={resending}
                  className="w-full py-3 px-6 rounded-full bg-blue-600 dark:bg-blue-500 text-white font-semibold text-base shadow hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-60"
                >
                  {resending ? 'Sending...' : 'Resend Verification Email'}
                </button>
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full py-3 px-6 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold text-base shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                  Continue to Profile
                </button>
              </div>
              {error && (
                <div className="text-red-500 text-sm mt-4">{error}</div>
              )}
              {success && (
                <div className="text-green-500 text-sm mt-4">Verification email sent successfully!</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
