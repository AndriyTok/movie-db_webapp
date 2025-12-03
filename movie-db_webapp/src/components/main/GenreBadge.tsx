import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {setActiveGenre} from "../../redux/slices/genres/genresSlice.ts";
import type {FC, MouseEvent} from "react";

type GenreBadgeProps = {
    genreId: number;
}

const GenreBadge: FC<GenreBadgeProps> = ({genreId}) => {
    const dispatch = useAppDispatch();
    const {genres} = useAppSelector(state => state.genresSlice);
    const genre = genres.find(g => g.id === genreId);

    const handleGenreClick = (e: MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        dispatch(setActiveGenre(genreId));
    };

    return (
        <span
            onClick={handleGenreClick}
            className='bg-white/15 text-white px-2.5 py-1 rounded-xl text-xs font-medium cursor-pointer
                    hover:bg-white/25 transition-all duration-200 hover:scale-105'
        >
                    {genre?.name || 'Unknown'}
                </span>
    );
};

export default GenreBadge;