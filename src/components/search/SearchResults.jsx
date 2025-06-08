import UserReposList from '../repos/UserReposList.jsx';
import { DocumentMagnify, TrashIcon } from '../../icons';

export default function SearchResults({ selectedUser, onClear }) {
  return (
    <section className="flex-1 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 min-h-[350px] border border-slate-100 dark:border-gray-800 transition-colors duration-300">
      <div className="flex items-center gap-2 mb-4 justify-between">
        <div className="flex items-center gap-2">
          <DocumentMagnify />
          <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300">Search Results</h2>
        </div>
        {selectedUser && (
          <button
            type="button"
            aria-label="Clear search results"
            className="text-red-500 hover:text-red-700 dark:hover:text-red-400 text-2xl focus:outline-none"
            onClick={onClear}
            title="Clear search results"
          >
            <TrashIcon />
          </button>
        )}
      </div>
      {selectedUser ? (
        <UserReposList username={selectedUser} />
      ) : (
        <div className="text-gray-500 dark:text-gray-400 italic">No results yet. Start searching above.</div>
      )}
    </section>
  );
}
