import UserReposList from '../repos/UserReposList.jsx';
import { SearchIcon } from '../../icons';

export default function SearchResults({ selectedUser }) {
  return (
    <section className="flex-1 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 min-h-[350px] border border-slate-100 dark:border-gray-800 transition-colors duration-300">
      <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-4 flex items-center gap-2">
        <SearchIcon />
        Search Results
      </h2>
      {selectedUser ? (
        <UserReposList username={selectedUser} />
      ) : (
        <div className="text-gray-500 dark:text-gray-400 italic">No results yet. Start searching above.</div>
      )}
    </section>
  );
}
