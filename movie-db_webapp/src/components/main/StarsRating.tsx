import type {FC} from "react";

type StarsRatingProps = {
    rating: number;
}

const StarsRating: FC<StarsRatingProps> = ({rating}) => {
    const normalizedRating = Math.round((rating / 10) * 5);

    return (
        <div className='stars-rating'>
            {[...Array(5)].map((_, index) => (
                <span key={index} className={index < normalizedRating ? 'star filled' : 'star'}>
                    ★
                </span>
            ))}
            <span className="rating-value">{rating.toFixed(1)}</span>
        </div>
    );
};

export default StarsRating;