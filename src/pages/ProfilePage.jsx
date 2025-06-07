import React, { useState } from 'react';
import { useAuth } from '../context/auth/useAuth';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [firstName, setFirstName] = useState(user?.displayName ? user.displayName.split(' ')[0] : '');
  const [lastName, setLastName] = useState(user?.displayName ? user.displayName.split(' ').slice(1).join(' ') : '');
  const [editing, setEditing] = useState(!user?.displayName);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-fuchsia-50 dark:from-gray-900 dark:to-gray-800 px-4 py-8">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-800">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-4xl font-bold text-blue-600 dark:text-blue-300 mb-2">
            {user?.displayName ? user.displayName[0] : user?.email[0]}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Profile</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your account details</p>
        </div>
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
      </div>
    </div>
  );
};

export default ProfilePage;
