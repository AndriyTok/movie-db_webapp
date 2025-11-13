import type {FC} from "react";

type PosterPreviewProps = {
    posterPath: string | null;
    title: string;
}

export const PosterPreview:FC<PosterPreviewProps> = ({posterPath, title}) => {
    const imageUrl = posterPath
        ? `https://image.tmdb.org/t/p/w500${posterPath}`
        : '/placeholder-movie.png'

    return (
        <div className='poster-preview'>
            <img src={imageUrl} alt={title}/>
        </div>
    );
};
