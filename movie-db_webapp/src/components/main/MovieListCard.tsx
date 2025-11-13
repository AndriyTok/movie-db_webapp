import type IMovie from "../../models/movies/IMovie.ts";
import type {FC} from "react";
import {PosterPreview} from "./PosterPreview.tsx";
import StarsRating from "./StarsRating.tsx";
import MovieInfo from "./MovieInfo.tsx";

type MovieListCardProps = {
    movie: IMovie;
}

export const MovieListCard: FC<MovieListCardProps> = ({movie}) => {
    return (
        <div className="movie-card">
            <PosterPreview posterPath={movie.poster_path} title={movie.title} />
            <div className="movie-card-content">
                <StarsRating rating={movie.vote_average} />
                <MovieInfo movie={movie} />
            </div>
        </div>
    );
};