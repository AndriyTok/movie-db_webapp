import {type FormEvent, useState} from "react";
import {useNavigate} from "react-router";

const SearchInput = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (searchQuery.trim()) {
            navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };


    return (
        <div>
            <form onSubmit={handleSearchSubmit} className="relative">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Пошук фільму..."
                    className="bg-white text-shadow-white text-sm text-left px-1 py-2 rounded-lg w-60
                    focus:outline-none focus:ring-0 border-none opacity-60"
                />
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                    🔍
                </button>
            </form>
        </div>
    );
};

export default SearchInput;