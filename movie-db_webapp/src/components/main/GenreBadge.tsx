import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import type {FC} from "react";

type GenreBadgeProps = {
    genreId: number;
}

const GenreBadge:FC<GenreBadgeProps> = ({genreId}) => {
    const {genres} = useAppSelector(state => state.genresSlice);
    const genre = genres.find(g => g.id === genreId);

    return (
        <span className={'genre-badge'}>
            {genre?.name || 'Unknown'}
        </span>
    );
};

export default GenreBadge;