import {type FC, useEffect, useRef, useState} from "react";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {setActiveGenre} from "../../redux/slices/genres/genresSlice.ts";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";

type GenresDropdownProps = {
    className?: string;
}

const GenresDropDown:FC<GenresDropdownProps> = ({className = ''}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const {genres} = useAppSelector(state => state.genresSlice);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleGenreClick = (genreId: number | null) => {
        dispatch(setActiveGenre(genreId));
        setIsOpen(false);
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-1 text-gray-100 hover:text-white transition-colors duration-200"
            >
                <span>Жанри</span>
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full -left-15 mt-2 w-35 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50">
                    <div className="py-2">
                        <button
                            onClick={() => handleGenreClick(null)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-150"
                        >
                            Всі фільми
                        </button>
                        {genres.map((genre) => (
                            <button
                                key={genre.id}
                                onClick={() => handleGenreClick(genre.id)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-150"
                            >
                                {genre.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GenresDropDown;