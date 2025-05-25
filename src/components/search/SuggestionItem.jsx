export default function SuggestionItem({ s: { type, id, login, avatar_url, html_url, name, description, owner, owner_avatar }, idx, highlightedIndex, onSelectSuggestion, setHighlightedIndex }) {
  return (
    <div
      role="option"
      aria-selected={idx === highlightedIndex}
      className={`flex items-center gap-3 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg px-2 py-1 transition ${idx === highlightedIndex ? 'bg-blue-100 dark:bg-gray-700' : ''}`}
      onMouseDown={() => {
        onSelectSuggestion && onSelectSuggestion({ type, id, login, avatar_url, html_url, name, description, owner, owner_avatar });
      }}
      onMouseEnter={() => setHighlightedIndex(idx)}
    >
      {type === "user" ? (
        <>
          <img src={avatar_url} alt={login} className="w-7 h-7 rounded-full" />
          <span className="font-semibold text-gray-800 dark:text-gray-100">{login}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">User</span>
        </>
      ) : (
        <>
          <img src={owner_avatar} alt={owner} className="w-7 h-7 rounded-full" />
          <span className="font-semibold text-gray-800 dark:text-gray-100">{name}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">Repo</span>
          {description && <span className="ml-2 text-xs text-gray-600 dark:text-gray-300 truncate max-w-xs">{description}</span>}
        </>
      )}
    </div>
  );
}
