import {useEffect} from "react";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {fetchMovies, fetchMoviesByGenre} from "../../redux/slices/movie/movieThunks.ts";
import {MovieListCard} from "./MovieListCard.tsx";
import {fetchGenres} from "../../redux/slices/genres/genresThunks.ts";

const MovieList = () => {
    const dispatch = useAppDispatch();
    const {movies, isLoading, currentPage} = useAppSelector(state => state.movieSlice);
    const {activeGenreId} = useAppSelector(state => state.genresSlice);

    useEffect(() => {
        dispatch(fetchGenres())
    }, [dispatch]);

    useEffect(() => {
        if (activeGenreId) {
            dispatch(fetchMoviesByGenre({id: activeGenreId, page: currentPage}));
        } else {
            dispatch(fetchMovies(currentPage));
        }
    }, [dispatch, currentPage, activeGenreId]);

    if (isLoading) {
        return <div className="text-center py-12 text-white text-lg">Loading movies...</div>;
    }

    return (
        <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 p-8
            max-w-[1400px] mx-auto">
            {movies.map(movie => (
                <MovieListCard key={movie.id} movie={movie}/>
            ))}
        </div>
    );
};

export default MovieList;