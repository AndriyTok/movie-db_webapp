import type {IMovieBaseResponse} from "../models/api_response/IMovieBaseResponse.ts";
import type {IGenresBaseResponse} from "../models/api_response/IGenresBaseResponse.ts";
import type IGenre from "../models/genres/IGenre.ts";
import {API, type MoviesWithPagination} from "./api.types.ts";
import type {IMovieDetails} from "../models/movies/details/IMovieDetails.ts";
import type IMovie from "../models/movies/IMovie.ts";

const fetchWithFallback = async (endpoint: string, params: Record<string, any>): Promise<IMovie[]> => {
    const ukResponse = await API.get<IMovieBaseResponse>(endpoint, {
        params: {...params, language: 'uk-UA'}
    });

    const moviesWithoutOverview = ukResponse.data.results.filter(m => !m.overview);

    if (moviesWithoutOverview.length === 0) {
        return ukResponse.data.results;
    }

    const enResponse = await API.get<IMovieBaseResponse>(endpoint, {
        params: {...params, language: 'en-US'}
    });

    return ukResponse.data.results.map(ukMovie => {
        if (!ukMovie.overview) {
            const enMovie = enResponse.data.results.find(m => m.id === ukMovie.id);
            return {...ukMovie, overview: enMovie?.overview || 'No description available'};
        }
        return ukMovie;
    });
};

export const movieService = {
    getMovies: async (page = 1): Promise<MoviesWithPagination> => {
        const ukResponse = await API.get<IMovieBaseResponse>('/discover/movie', {
            params: {page, language: 'uk-UA', include_adult: false}
        });

        const results = await fetchWithFallback('/discover/movie', {page, include_adult: false});

        return {
            results,
            page: ukResponse.data.page,
            total_pages: ukResponse.data.total_pages
        };
    },

    getMoviesByGenre: async (id: number, page = 1): Promise<MoviesWithPagination> => {
        const ukResponse = await API.get<IMovieBaseResponse>('/discover/movie', {
            params: {with_genres: id, page, language: 'uk-UA', include_adult: false}
        });

        const results = await fetchWithFallback('/discover/movie', {with_genres: id, page, include_adult: false});

        return {
            results,
            page: ukResponse.data.page,
            total_pages: ukResponse.data.total_pages
        };
    },

    searchMovies: async (query: string, page = 1): Promise<MoviesWithPagination> => {
        const ukResponse = await API.get<IMovieBaseResponse>('/search/movie', {
            params: {query, page, language: 'uk-UA', include_adult: false}
        });

        const results = await fetchWithFallback('/search/movie', {query, page, include_adult: false});

        return {
            results,
            page: ukResponse.data.page,
            total_pages: ukResponse.data.total_pages
        };
    }
};

export const genreService = {
    getGenres: async (): Promise<IGenre[]> => {
        const response = await API.get<IGenresBaseResponse>('/genre/movie/list', {
            params: {language: 'uk-UA'}
        });
        return response.data.genres;
    },
};

export const movieDetailsService = {
    getMovieDetails: async (movieID: number): Promise<IMovieDetails> => {
        const ukResponse = await API.get<IMovieDetails>(`/movie/${movieID}`, {
            params: {language: 'uk-UA'}
        });

        if (!ukResponse.data.overview) {
            const enResponse = await API.get<IMovieDetails>(`/movie/${movieID}`, {
                params: {language: 'en-US'}
            });
            ukResponse.data.overview = enResponse.data.overview;
        }

        return ukResponse.data;
    }
}