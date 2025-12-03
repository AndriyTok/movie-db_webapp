import {type FormEvent, useState} from "react";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {searchMovies} from "../../redux/slices/movie/movieThunks.ts";
import {setSearchQuery} from "../../redux/slices/movie/movieSlice.ts";

const SearchInput = () => {
    const [localQuery, setLocalQuery] = useState('');
    const dispatch = useAppDispatch();

    const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (localQuery.trim()) {
            dispatch(setSearchQuery(localQuery.trim()));
            dispatch(searchMovies({query: localQuery.trim(), page: 1}));
            setLocalQuery('');
        }
    };

    return (
        <div>
            <form onSubmit={handleSearchSubmit} className="relative">
                <input
                    type="text"
                    value={localQuery}
                    onChange={(e) => setLocalQuery(e.target.value)}
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