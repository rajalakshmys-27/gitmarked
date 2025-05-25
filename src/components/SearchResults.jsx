import UserReposList from './UserReposList.jsx'

export default function SearchResults({ selectedUser }) {
  return (
    <section className="flex-1 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 min-h-[350px] border border-slate-100 dark:border-gray-800 transition-colors duration-300">
      <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-4 flex items-center gap-2">
        <svg className="h-6 w-6 text-blue-400 dark:text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 21l-4.35-4.35" /><circle cx="11" cy="11" r="8" /></svg>
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
