import {type FC, useEffect, useRef, useState} from "react";
import {Link} from "react-router";

const GENRES = [
    { id: 28, name: 'Бойовик', slug: 'action' },
    { id: 35, name: 'Комедія', slug: 'comedy' },
    { id: 18, name: 'Драма', slug: 'drama' },
    { id: 27, name: 'Жахи', slug: 'horror' },
    { id: 10749, name: 'Мелодрама', slug: 'romance' },
    { id: 878, name: 'Фантастика', slug: 'sci-fi' },
    { id: 53, name: 'Трилер', slug: 'thriller' },
    { id: 16, name: 'Анімація', slug: 'animation' },
    { id: 80, name: 'Кримінал', slug: 'crime' },
    { id: 14, name: 'Фентезі', slug: 'fantasy' }
];

type GenresDropdownProps = {
    className?: string;
}

const GenresDropDown:FC<GenresDropdownProps> = ({className = ''}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handeClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handeClickOutside);
    }, []);

    const handleToogle = () => {
        setIsOpen(!isOpen);
    }

    const handleGenreClick = () => {
        setIsOpen(false);
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <button
                onClick={handleToogle}
                className="flex items-center space-x-1 text-gray-100 hover:text-white transition-colors duration-200"
                aria-expanded={isOpen}
                aria-haspopup="true"
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
                <div className="absolute top-full left-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-xl border
                border-gray-700 z-50 opacity-70">
                    <div className="py-2">
                        {GENRES.map((genre) => (
                            <Link
                                key={genre.id}
                                to={`/${genre.slug}`}
                                onClick={handleGenreClick}
                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700
                                hover:text-white transition-colors duration-150"
                            >
                                {genre.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GenresDropDown;
