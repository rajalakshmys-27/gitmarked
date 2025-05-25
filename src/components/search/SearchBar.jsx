import { useState, useEffect, useCallback } from "react";
import SuggestionItem from "./SuggestionItem";
import useDebounce from "../../hooks/useDebounce";
import { getGithubToken } from '../../utils/githubToken.js';
import { SearchIcon } from '../../icons';

export default function SearchBar({ value, onChange, onSelectSuggestion, suggestionsVisible, setSuggestionsVisible, onClear }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const debouncedValue = useDebounce(value, 400);

  useEffect(() => {
    if (!debouncedValue) {
      setSuggestions([]);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const token = getGithubToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const [usersRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/search/users?q=${encodeURIComponent(debouncedValue)}&per_page=5`, { headers }),
          fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(debouncedValue)}&per_page=5`, { headers })
        ]);
        let errorDetail = "";
        if (!usersRes.ok) {
          errorDetail += `Users: ${usersRes.status} ${usersRes.statusText}. `;
        }
        if (!reposRes.ok) {
          errorDetail += `Repos: ${reposRes.status} ${reposRes.statusText}.`;
        }
        if (!usersRes.ok || !reposRes.ok) {
          const usersText = await usersRes.text();
          const reposText = await reposRes.text();
          errorDetail += ` Users: ${usersText} Repos: ${reposText}`;
          throw new Error("GitHub API error. " + errorDetail);
        }
        const usersData = await usersRes.json();
        const reposData = await reposRes.json();
        const userSuggestions = (usersData.items || []).map(u => ({
          type: "user",
          id: u.id,
          login: u.login,
          avatar_url: u.avatar_url,
          html_url: u.html_url
        }));
        const repoSuggestions = (reposData.items || []).map(r => ({
          type: "repo",
          id: r.id,
          name: r.full_name,
          description: r.description,
          html_url: r.html_url,
          owner: r.owner?.login,
          owner_avatar: r.owner?.avatar_url
        }));
        setSuggestions([...userSuggestions, ...repoSuggestions]);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch suggestions");
        setLoading(false);
      }
    })();
  }, [debouncedValue]);

  // Keyboard navigation
  useEffect(() => {
    if (!value || suggestions.length === 0) {
      setHighlightedIndex(-1);
      return;
    }
    setHighlightedIndex(0);
  }, [suggestions, value]);

  // Hide suggestions on blur (optional, for better UX)
  const handleBlur = () => {
    setTimeout(() => setSuggestionsVisible(false), 100); // Delay to allow click
  };

  // Show suggestions on focus if input has value
  const handleFocus = () => {
    if (value) setSuggestionsVisible(true);
  };

  const handleKeyDown = useCallback((e) => {
    if (!suggestions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex(i => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex(i => (i - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        e.preventDefault();
        onSelectSuggestion && onSelectSuggestion(suggestions[highlightedIndex]);
        setSuggestionsVisible(false); // Hide suggestions on enter
      }
    }
  }, [suggestions, highlightedIndex, onSelectSuggestion, setSuggestionsVisible]);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-4">      <div className="relative w-full">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
          <SearchIcon className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder="Search repositories, users..."
          className="w-full pl-12 pr-12 py-4 text-lg rounded-2xl border border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition outline-none bg-white dark:bg-gray-800 shadow-lg text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 font-semibold"
          autoFocus
          aria-autocomplete="list"
          aria-controls="search-suggestions-list"
          aria-activedescendant={highlightedIndex >= 0 ? `suggestion-${highlightedIndex}` : undefined}
        />
        {value && (
          <button
            type="button"
            aria-label="Clear search"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 text-2xl focus:outline-none"
            onClick={onClear}
            tabIndex={0}
          >
            &#10005;
          </button>
        )}
      </div>
      {/* Suggestions below search bar, only show if user is typing and suggestionsVisible */}
      {value && suggestionsVisible && (
        <div
          id="search-suggestions-list"
          role="listbox"
          className="w-full bg-white dark:bg-gray-900 rounded-xl shadow border border-slate-100 dark:border-gray-800 p-4 mt-1 min-h-[48px] flex flex-col gap-2"
        >
          {loading && <div className="text-gray-400 dark:text-gray-500 text-base italic">Loading...</div>}
          {error && <div className="text-red-500 text-base italic">{error}</div>}
          {!loading && !error && suggestions.length === 0 && (
            <div className="text-gray-400 dark:text-gray-500 text-base italic">No suggestions found.</div>
          )}
          {!loading && !error && suggestions.map((s, idx) => (
            <SuggestionItem
              key={s.type + s.id}
              s={s}
              idx={idx}
              highlightedIndex={highlightedIndex}
              onSelectSuggestion={(item) => {
                onSelectSuggestion && onSelectSuggestion(item);
                setSuggestionsVisible(false);
              }}
              setHighlightedIndex={setHighlightedIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
}
