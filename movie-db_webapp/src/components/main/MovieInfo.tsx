import type {FC} from "react";
import type IMovie from "../../models/movies/IMovie.ts";
import GenreBadge from "./GenreBadge.tsx";

type MovieInfoProps = {
    movie: IMovie;
}

const MovieInfo: FC<MovieInfoProps> = ({movie}) => {
    return (
        <div className="text-white">
            <h3 className="text-lg font-bold mb-2 leading-tight">{movie.title}</h3>
            <p className="text-[13px] leading-relaxed mb-3 text-white/80 line-clamp-3">
                {movie.overview || 'No description available'}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-3">
                {movie.genre_ids.map(genreId => (
                    <GenreBadge key={genreId} genreId={genreId}/>
                ))}
            </div>
            <div className="flex flex-col justify-around text-xs text-white/70">
                <span>Release: {movie.release_date}</span>
                <span>Popularity: {movie.popularity.toFixed(1)}</span>
            </div>
        </div>
    );
};

export default MovieInfo;