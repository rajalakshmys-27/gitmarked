import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/auth/useAuth';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { sendVerificationEmail, changePassword } from '../services/auth.js';
import { VerificationIcon, EyeIcon, EyeOffIcon, MailIcon, WarningIcon } from '../icons/index.jsx';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [firstName, setFirstName] = useState(user?.displayName ? user.displayName.split(' ')[0] : '');
  const [lastName, setLastName] = useState(user?.displayName ? user.displayName.split(' ').slice(1).join(' ') : '');
  const [editing, setEditing] = useState(!user?.displayName);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifySent, setVerifySent] = useState(false);
  const [isVerified, setIsVerified] = useState(user?.emailVerified);
  const [showVerifiedMsg, setShowVerifiedMsg] = useState(false);
  const [hasShownVerifiedMsg, setHasShownVerifiedMsg] = useState(false);
  const [tab, setTab] = useState('profile');

  // Change password state
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [pwdSuccess, setPwdSuccess] = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);
  // Show/hide password states
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const prevEmailVerified = useRef(user?.emailVerified);
  const navigate = useNavigate();

  const handleSendVerification = async () => {
    setVerifyLoading(true);
    setError(null);
    const { success, error } = await sendVerificationEmail();
    if (success) setVerifySent(true);
    else setError(error?.message || 'Failed to send verification email.');
    setVerifyLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await updateProfile(user, { displayName: `${firstName} ${lastName}` });
      updateUser({ ...user, displayName: `${firstName} ${lastName}` });
      setEditing(false);
    } catch (err) {
      setError('Failed to update profile.');
      console.error('Profile update error:', err);
    }
    setSaving(false);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwdError('');
    setPwdSuccess('');
    if (newPwd.length < 6) {
      setPwdError('New password must be at least 6 characters.');
      return;
    }
    if (newPwd !== confirmPwd) {
      setPwdError('Passwords do not match.');
      return;
    }
    setPwdLoading(true);
    const { success, error } = await changePassword(currentPwd, newPwd);
    if (success) {
      setPwdSuccess('Password changed successfully!');
      setCurrentPwd(''); setNewPwd(''); setConfirmPwd('');
    } else {
      setPwdError(error?.message || 'Failed to change password.');
    }
    setPwdLoading(false);
  };

  // Auto-refresh verification status every 5 seconds if not verified
  useEffect(() => {
    if (!user || isVerified) return;
    const interval = setInterval(async () => {
      try {
        await user.reload();
        if (user.emailVerified) {
          setIsVerified(true);
          updateUser({ ...user, emailVerified: true });
        }
      } catch {
        // Ignore errors during polling
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [user, isVerified, updateUser]);

  // Show verified message for a few seconds ONLY if user just verified for the first time
  useEffect(() => {
    if (
      user &&
      prevEmailVerified.current === false &&
      user.emailVerified === true &&
      !hasShownVerifiedMsg
    ) {
      setShowVerifiedMsg(true);
      setHasShownVerifiedMsg(true);
      const timer = setTimeout(() => setShowVerifiedMsg(false), 4000);
      return () => clearTimeout(timer);
    }
    prevEmailVerified.current = user?.emailVerified;
  }, [user, hasShownVerifiedMsg]);

  // Auto-send verification email on first registration (first login, not verified)
  useEffect(() => {
    if (!user || user.emailVerified) return;
    // Use sessionStorage to avoid resending on every reload
    const autoSentKey = `autoVerificationSent_${user.uid}`;
    if (!sessionStorage.getItem(autoSentKey)) {
      // Only auto-send if user just registered (no displayName or just created)
      if (!user.displayName) {
        (async () => {
          setVerifyLoading(true);
          setError(null);
          const { success, error } = await sendVerificationEmail();
          if (success) setVerifySent(true);
          else setError(error?.message || 'Failed to send verification email.');
          setVerifyLoading(false);
          sessionStorage.setItem(autoSentKey, 'true');
        })();
      }
    }
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-fuchsia-50 dark:from-gray-900 dark:to-gray-800 px-4 py-8">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-800">
        <div className="flex flex-col items-center justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-4xl font-bold text-blue-600 dark:text-blue-300 mb-2">
            {user?.displayName ? user.displayName[0] : user?.email[0]}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Profile</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your account details</p>
        </div>
        {/* Tabs */}
        <div className="flex mb-6 border-b border-gray-200 dark:border-gray-700">
          <button onClick={() => setTab('profile')} className={`px-4 py-2 font-semibold ${tab==='profile' ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}>Profile</button>
          <button onClick={() => setTab('password')} className={`ml-4 px-4 py-2 font-semibold ${tab==='password' ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}>Change Password</button>
        </div>
        {tab === 'profile' && (
          <>
            {/* Email verification warning or success */}
            {user && !isVerified && (
              <div className="mb-4 p-4 rounded-lg bg-yellow-100 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 flex flex-col items-center">
                <WarningIcon className="w-8 h-8 text-yellow-500 mb-2" />
                <span className="text-yellow-800 dark:text-yellow-200 font-semibold text-center">Your email is not verified.</span>
                <span className="text-yellow-700 dark:text-yellow-300 text-sm text-center mb-2">Please verify your email to unlock all features.</span>
                <div className="flex flex-col gap-2 w-full items-center">
                  <button
                    type="button"
                    onClick={handleSendVerification}
                    disabled={verifyLoading || verifySent}
                    className="px-4 py-2 rounded-md bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors disabled:opacity-60 mb-1 mt-2 w-full"
                  >
                    {verifyLoading ? 'Sending...' : verifySent ? 'Verification Sent!' : 'Send Verification Email'}
                  </button>
                </div>
              </div>
            )}
            {user && showVerifiedMsg && (
              <div className="mb-4 p-4 rounded-lg bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 flex flex-col items-center animate-fade-in">
                <VerificationIcon />
                <span className="text-green-800 dark:text-green-200 font-semibold text-center text-lg mt-1">Your email is verified now!</span>
              </div>
            )}
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 disabled:cursor-not-allowed"
                  disabled={!editing}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 disabled:cursor-not-allowed"
                  disabled={!editing}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm focus:outline-none"
                  disabled
                />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <div className="flex justify-end gap-2 mt-4">
                {!editing && (
                  <button type="button" onClick={() => setEditing(true)} className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">Edit</button>
                )}
                {editing && (
                  <button type="submit" disabled={saving} className="px-4 py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors disabled:opacity-60">
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                )}
                <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">Back</button>
              </div>
            </form>
          </>
        )}
        {tab === 'password' && (
          <form onSubmit={handleChangePassword} className="space-y-4 animate-fade-in">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
              <input
                type={showCurrentPwd ? "text" : "password"}
                value={currentPwd}
                onChange={e => setCurrentPwd(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPwd(!showCurrentPwd)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 mt-7"
                tabIndex={-1}
              >
                {showCurrentPwd ? (
                  <EyeOffIcon />
                ) : (
                  <EyeIcon />
                )}
              </button>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
              <input
                type={showNewPwd ? "text" : "password"}
                value={newPwd}
                onChange={e => setNewPwd(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPwd(!showNewPwd)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 mt-7"
                tabIndex={-1}
              >
                {showNewPwd ? (
                  <EyeOffIcon />
                ) : (
                  <EyeIcon />
                )}
              </button>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
              <input
                type={showConfirmPwd ? "text" : "password"}
                value={confirmPwd}
                onChange={e => setConfirmPwd(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 mt-7"
                tabIndex={-1}
              >
                {showConfirmPwd ? (
                  <EyeOffIcon />
                ) : (
                  <EyeIcon />
                )}
              </button>
            </div>
            {pwdError && <div className="text-red-500 text-sm">{pwdError}</div>}
            {pwdSuccess && <div className="text-green-600 text-sm">{pwdSuccess}</div>}
            <div className="flex justify-end gap-2 mt-4">
              <button type="submit" disabled={pwdLoading} className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60">
                {pwdLoading ? 'Changing...' : 'Change Password'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
