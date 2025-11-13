import {useEffect} from "react";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {fetchMovies, fetchMoviesByGenre} from "../../redux/slices/movie/movieThunks.ts";
import {MovieListCard} from "./MovieListCard.tsx";

const MovieList = () => {
    const dispatch = useAppDispatch();
    const {movies, isLoading, currentPage} = useAppSelector(state => state.movieSlice);
    const {activeGenreId} = useAppSelector(state => state.genresSlice);

    useEffect(() => {
        if (activeGenreId) {
            dispatch(fetchMoviesByGenre({id: activeGenreId, page: currentPage}));
        } else {
            dispatch(fetchMovies(currentPage));
        }
    }, [dispatch, currentPage, activeGenreId]);

    if (isLoading) {
        return <div className="loading">Loading movies...</div>;
    }

    return (
        <div className="movie-list">
            {movies.map(movie => (
                <MovieListCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default MovieList;