import type {FC} from "react";
import type IMovie from "../../models/movies/IMovie.ts";
import GenreBadge from "./GenreBadge.tsx";

type MovieInfoProps = {
    movie: IMovie;
}

const MovieInfo: FC<MovieInfoProps> = ({movie}) => {
    return (
        <div className="movie-info">
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-description">
                {movie.overview || 'No description available'}
            </p>
            <div className="genre-badges">
                {movie.genre_ids.map(genreId => (
                    <GenreBadge key={genreId} genreId={genreId} />
                ))}
            </div>
            <div className="movie-meta">
                <span>Release: {movie.release_date}</span>
                <span>Popularity: {movie.popularity.toFixed(1)}</span>
            </div>
        </div>
    );
};

export default MovieInfo;