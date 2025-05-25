export default function Bookmarks() {
  return (
    <aside className="w-full md:w-1/3 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 min-h-[350px] border border-blue-100 dark:border-gray-800 transition-colors duration-300">
      <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-4 flex items-center gap-2">
        <svg className="h-6 w-6 text-blue-400 dark:text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 5v14l7-7 7 7V5z" /></svg>
        Bookmarks
      </h2>
      <div className="text-gray-500 dark:text-gray-400 italic">No bookmarks yet.</div>
    </aside>
  );
}
