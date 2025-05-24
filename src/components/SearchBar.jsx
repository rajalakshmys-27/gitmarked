export default function SearchBar({ value, onChange }) {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-4">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search repositories, users..."
        className="w-full px-6 py-4 text-lg rounded-2xl border border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition outline-none bg-white dark:bg-gray-800 shadow-lg text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 font-semibold"
        autoFocus
      />
      {/* Suggestions below search bar, only show if user is typing */}
      {value && (
        <div className="w-full bg-white dark:bg-gray-900 rounded-xl shadow border border-slate-100 dark:border-gray-800 p-4 mt-1 min-h-[48px] flex flex-col gap-2">
          <div className="text-gray-400 dark:text-gray-500 text-base italic">Suggestions will appear here...</div>
        </div>
      )}
    </div>
  )
}
