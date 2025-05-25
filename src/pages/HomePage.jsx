import { useState, useCallback } from 'react';
import SearchBar from '../components/search/SearchBar';
import SearchResults from '../components/search/SearchResults';
import Bookmarks from '../components/bookmarks/Bookmarks';
import { getUsernameFromSuggestion } from '../utils/getUsernameFromSuggestion';

function HomePage() {
    const [search, setSearch] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [suggestionsVisible, setSuggestionsVisible] = useState(true);

    const handleSelectSuggestion = useCallback((suggestion) => {
        const username = getUsernameFromSuggestion(suggestion);
        setSelectedUser(username || null);
        setSuggestionsVisible(false); // Hide suggestions when a suggestion is selected
        setSearch(username || ''); // Set the search input to the selected username so results show
    }, []);

    // Show suggestions again when user types
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setSuggestionsVisible(true);
    };

    const handleClearSearch = () => {
        setSearch('');
        setSelectedUser(null);
        setSuggestionsVisible(false);
    };

    return (
        <div className="flex flex-col items-center gap-10 max-w-7xl mx-auto py-12 px-4 w-full">
            <SearchBar
                value={search}
                onChange={handleSearchChange}
                onSelectSuggestion={handleSelectSuggestion}
                suggestionsVisible={suggestionsVisible}
                setSuggestionsVisible={setSuggestionsVisible}
                onClear={handleClearSearch}
            />
            <div className="flex flex-col md:flex-row gap-8 w-full mt-6">
                <SearchResults selectedUser={selectedUser} onClear={handleClearSearch} />
                <Bookmarks />
            </div>
        </div>
    );
}

export default HomePage;
