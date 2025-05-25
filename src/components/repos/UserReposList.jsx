import { useEffect, useState, useRef } from 'react';
import { useBookmarks } from '../../context/bookmarks/useBookmarks.js';
import Toast from '../ui/Toast.jsx';
import { ChevronDownIcon, BookmarkIcon } from '../../icons';
import { getGithubToken } from '../../utils/githubToken.js';

export default function UserReposList({ username }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(true);
  const [toastMsg, setToastMsg] = useState('');
  const { addBookmark } = useBookmarks();
  const toastTimeout = useRef(null);

  useEffect(() => {
    if (!username) return;
    setLoading(true);
    setError(null);
    setRepos([]);
    
    const token = getGithubToken();
    fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
      .then(res => {
        if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
        return res.json();
      })
      .then(data => setRepos(data))
      .catch(err => setError(err.message || 'Failed to fetch repositories'))
      .finally(() => setLoading(false));

    return () => {
      if (toastTimeout.current) clearTimeout(toastTimeout.current);
    };
  }, [username]);

  const handleBookmark = (repo) => {
    addBookmark(repo);
    setToastMsg('Bookmarked successfully!');
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setToastMsg(""), 2000);
  };

  if (!username) return null;

  return (
    <div className="mt-8">
      <Toast message={toastMsg} onClose={() => setToastMsg('')} />
      <div className="w-full max-w-2xl mx-auto">
        <button
          className="w-full flex items-center justify-between px-6 py-4 bg-blue-100 dark:bg-gray-800 rounded-lg shadow border border-blue-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
        >
          <span className="text-xl font-bold text-blue-700 dark:text-blue-300">{username}'s Public Repositories</span>
          <ChevronDownIcon className={open ? 'rotate-180' : ''} />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-[1000px] opacity-100 mt-2' : 'max-h-0 opacity-0'} bg-white dark:bg-gray-900 rounded-b-lg border-t-0 border border-blue-200 dark:border-gray-700`}
        >
          {loading && <div className="text-gray-400 dark:text-gray-500 italic px-6 py-4">Loading repositories...</div>}
          {error && <div className="text-red-500 italic px-6 py-4">{error}</div>}
          {!loading && !error && repos.length === 0 && (
            <div className="text-gray-400 dark:text-gray-500 italic px-6 py-4">No public repositories found.</div>
          )}
          <ul className="space-y-4 px-6 py-4">
            {repos.map(repo => (
              <li key={repo.id} className="bg-blue-50 dark:bg-gray-800 rounded-lg p-4 shadow border border-blue-100 dark:border-gray-700 flex items-start justify-between gap-4">
                <div>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 dark:text-blue-300 hover:underline text-lg">{repo.name}</a>
                  {repo.description && <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{repo.description}</p>}
                </div>
                <button
                  className="ml-2 p-2 rounded-full hover:bg-blue-200 dark:hover:bg-gray-700 transition"
                  title="Bookmark"
                  onClick={() => handleBookmark(repo)}
                  aria-label="Bookmark"
                >
                  <BookmarkIcon />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
