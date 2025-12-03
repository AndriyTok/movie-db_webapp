import type {FC} from "react";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {fetchMovies, fetchMoviesByGenre} from "../../redux/slices/movie/movieThunks.ts";

const Pagination: FC = () => {
    const dispatch = useAppDispatch();
    const {currentPage, total_pages} = useAppSelector(state => state.movieSlice);
    const {activeGenreId} = useAppSelector(state => state.genresSlice);

    const handlePageChange = (page: number) => {
        if (activeGenreId) {
            dispatch(fetchMoviesByGenre({id: activeGenreId, page}));
        } else {
            dispatch(fetchMovies(page));
        }
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const showPages = 5;

        if (total_pages <= showPages + 2) {
            for (let i = 1; i <= total_pages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            if (currentPage > 3) pages.push('...');

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(total_pages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < total_pages - 2) pages.push('...');

            pages.push(total_pages);
        }

        return pages;
    };

    return (
        <div className="flex justify-center items-center gap-2 py-8">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white/10 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 transition"
            >
                ←
            </button>

            {getPageNumbers().map((page, index) => (
                typeof page === 'number' ? (
                    <button
                        key={index}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg transition ${
                            currentPage === page
                                ? 'bg-amber-500 text-black font-bold'
                                : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                    >
                        {page}
                    </button>
                ) : (
                    <span key={index} className="text-white px-2">...</span>
                )
            ))}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === total_pages}
                className="px-4 py-2 bg-white/10 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 transition"
            >
                →
            </button>
        </div>
    );
};

export default Pagination;