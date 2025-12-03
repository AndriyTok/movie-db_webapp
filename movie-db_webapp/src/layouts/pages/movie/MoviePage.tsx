import {useEffect} from "react";
import {useParams, useNavigate} from "react-router";
import {useAppDispatch} from "../../../redux/hooks/useAppDispatch.ts";
import {useAppSelector} from "../../../redux/hooks/useAppSelector.ts";
import {fetchMovieDetails} from "../../../redux/slices/details/detailsThunks.ts";
import StarsRating from "../../../components/main/StarsRating.tsx";
import bgImage from "../../../images/movies-bg.jpg";
import Header from "../../../components/header/Header.tsx";

const MoviePage = () => {
    const {id} = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {details, isLoading, error} = useAppSelector(state => state.detailsSlice);

    useEffect(() => {
        if (id) {
            dispatch(fetchMovieDetails(Number(id)));
        }
    }, [dispatch, id]);

    if (isLoading) {
        return (
            <div
                className="min-h-screen bg-cover bg-center"
                style={{backgroundImage: `url(${bgImage})`}}
            >
                <Header/>
                <div className="flex items-center justify-center py-20">
                    <div className="text-white text-2xl">Завантаження...</div>
                </div>
            </div>
        );
    }

    if (error || !details) {
        return (
            <div
                className="min-h-screen bg-cover bg-center"
                style={{backgroundImage: `url(${bgImage})`}}
            >
                <Header/>
                <div className="flex items-center justify-center py-20">
                    <div className="text-red-500 text-2xl">{error || "Фільм не знайдено"}</div>
                </div>
            </div>
        );
    }

    const backdropUrl = details.backdrop_path
        ? `https://image.tmdb.org/t/p/original${details.backdrop_path}`
        : bgImage;

    const posterUrl = details.poster_path
        ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
        : '/placeholder-movie.png';

    return (
        <div
            className="min-h-screen bg-cover bg-center"
            style={{backgroundImage: `url(${bgImage})`}}
        >
            <Header/>

            <div className="relative">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{backgroundImage: `url(${backdropUrl})`}}
                />

                <div className="relative max-w-6xl mx-auto p-8 pt-12">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-6 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition"
                    >
                        ← Назад
                    </button>

                    <div className="flex flex-col md:flex-row gap-8 bg-black/60 p-8 rounded-2xl border border-white/20">
                        <img
                            src={posterUrl}
                            alt={details.title}
                            className="w-full md:w-80 rounded-xl shadow-2xl"
                        />

                        <div className="flex-1 text-white">
                            <h1 className="text-4xl font-bold mb-4">{details.title}</h1>

                            {details.tagline && (
                                <p className="text-gray-400 italic mb-4">{details.tagline}</p>
                            )}

                            <StarsRating rating={details.vote_average}/>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {details.genres.map(genre => (
                                    <span
                                        key={genre.id}
                                        className="bg-white/15 px-3 py-1 rounded-full text-sm"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                                <div>
                                    <span className="text-gray-400">Дата виходу:</span>
                                    <p className="font-semibold">{details.release_date}</p>
                                </div>
                                <div>
                                    <span className="text-gray-400">Тривалість:</span>
                                    <p className="font-semibold">{details.runtime} хв</p>
                                </div>
                                <div>
                                    <span className="text-gray-400">Бюджет:</span>
                                    <p className="font-semibold">${details.budget.toLocaleString()}</p>
                                </div>
                                <div>
                                    <span className="text-gray-400">Касові збори:</span>
                                    <p className="font-semibold">${details.revenue.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-2xl font-bold mb-2">Опис</h2>
                                <p className="text-gray-300 leading-relaxed">{details.overview}</p>
                            </div>

                            {details.production_companies.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Виробництво</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {details.production_companies.map(company => (
                                            <span
                                                key={company.id}
                                                className="bg-white/10 px-3 py-1 rounded-lg text-sm"
                                            >
                                                {company.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoviePage;