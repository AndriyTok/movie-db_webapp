import type {FC} from "react";

type StarsRatingProps = {
    rating: number;
}

const StarsRating: FC<StarsRatingProps> = ({rating}) => {
    const normalizedRating = Math.round((rating / 10) * 5);

    return (
        <div className='flex items-center gap-1 mb-3'>
            {[...Array(5)].map((_, index) => (
                <span key={index} className={`text-xl ${index < normalizedRating ? 'text-yellow-400' : 'text-yellow-400/30'}`}>
                    ★
                </span>
            ))}
            <span className="ml-2 text-white text-sm font-semibold">{rating.toFixed(1)}</span>
        </div>
    );
};

export default StarsRating;