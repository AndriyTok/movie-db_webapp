import type {IMovieBaseResponse} from "../models/api_response/IMovieBaseResponse.ts";
import type {IGenresBaseResponse} from "../models/api_response/IGenresBaseResponse.ts";
import type IGenre from "../models/genres/IGenre.ts";
import {API, type MoviesWithPagination} from "./api.types.ts";
import type {IMovieDetails} from "../models/movies/details/IMovieDetails.ts";

export const movieService = {
    getMovies: async (page = 1): Promise<MoviesWithPagination> => {
        const response = await API.get<IMovieBaseResponse>('/discover/movie', {
            params: {page}
        });
        return {
            results: response.data.results,
            page: response.data.page,
            total_pages: response.data.total_pages
        };
    },

    getMoviesByGenre: async (id: number, page = 1): Promise<MoviesWithPagination> => {
        const response = await API.get<IMovieBaseResponse>('/discover/movie', {
            params: {with_genres: id, page}
        });
        return {
            results: response.data.results,
            page: response.data.page,
            total_pages: response.data.total_pages
        };
    },

    searchMovies: async (query: string, page = 1): Promise<MoviesWithPagination> => {
        const response = await API.get<IMovieBaseResponse>('/search/movie', {
            params: {query, page}
        });
        return {
            results: response.data.results,
            page: response.data.page,
            total_pages: response.data.total_pages
        };
    }
};

export const genreService = {
    getGenres: async (): Promise<IGenre[]> => {
        const response = await API.get<IGenresBaseResponse>('/genre/movie/list');
        return response.data.genres;
    },
};

export const movieDetailsService = {
    getMovieDetails: async(movieID: number): Promise<IMovieDetails> => {
        const response = await API.get<IMovieDetails>(`/movie/${movieID}`);
        return response.data;
    }
}