import axios from 'axios';
import type {IBaseResponse} from "../models/api_response/IBaseResponse";
import type IMovie from '../models/movies/IMovie';

const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    params: {
        api_key: import.meta.env.VITE_BASE_API_KEY
    }
});

export type MoviesWithPagination = {
    results: IMovie[];
    page: number;
    total_pages: number;
}

export const movieService = {
    getMovies: async (page = 1): Promise<MoviesWithPagination> => {
        const response = await API.get<IBaseResponse>('/discover/movie', {
            params: {page}
        });
        return {
            results: response.data.results,
            page: response.data.page,
            total_pages: response.data.total_pages
        };
    },

    getMoviesByGenre: async (id: number, page = 1): Promise<MoviesWithPagination> => {
        const response = await API.get<IBaseResponse>('/discover/movie', {
            params: {with_genres: id, page}
        });
        return {
            results: response.data.results,
            page: response.data.page,
            total_pages: response.data.total_pages
        };
    },

    searchMovies: async (query: string, page = 1): Promise<MoviesWithPagination> => {
        const response = await API.get<IBaseResponse>('/search/movie', {
            params: {query, page}
        });
        return {
            results: response.data.results,
            page: response.data.page,
            total_pages: response.data.total_pages
        };
    }
};