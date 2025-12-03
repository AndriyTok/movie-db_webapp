import type IMovie from "../../models/movies/IMovie.ts";
import type {FC} from "react";
import {PosterPreview} from "./PosterPreview.tsx";
import StarsRating from "./StarsRating.tsx";
import MovieInfo from "./MovieInfo.tsx";
import {useNavigate} from "react-router";

type MovieListCardProps = {
    movie: IMovie;
}

export const MovieListCard: FC<MovieListCardProps> = ({movie}) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="bg-black/70 border border-white/20 rounded-xl overflow-hidden transition-all duration-300
                hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
        >
            <PosterPreview posterPath={movie.poster_path} title={movie.title}/>
            <div className="p-4">
                <StarsRating rating={movie.vote_average}/>
                <MovieInfo movie={movie}/>
            </div>
        </div>
    );
};