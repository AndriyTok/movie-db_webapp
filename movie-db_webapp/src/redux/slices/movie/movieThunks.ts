import {createAsyncThunk} from "@reduxjs/toolkit";
import type IMovie from "../../../models/movies/IMovie.ts";
import type {IBaseResponse} from "../../../models/api_response/IBaseResponse.ts";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_BASE_API_KEY;

// Create a custom return type that includes both movies and pagination
type MoviesWithPagination = {
    results: IMovie[];
    page: number;
    total_pages: number;
}

export const fetchMovies = createAsyncThunk<
    MoviesWithPagination,
    number,
    { rejectValue: string }
>(
    'movies/fetchMovies',
    async (currentPage = 1, thunkAPI) => {
        try {
            const res = await fetch(
                `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${currentPage}`
            );
            if (!res.ok) {
                return thunkAPI.rejectWithValue(`HTTP ${res.status}`);
            }
            const data = (await res.json()) as IBaseResponse;
            return {
                results: data.results,
                page: data.page,
                total_pages: data.total_pages
            };
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue('Failed to fetch movies!');
        }
    }
);

export const fetchMoviesByGenre = createAsyncThunk<
    MoviesWithPagination,
    { id: number; page?: number },
    { rejectValue: string }
>(
    'movies/fetchMoviesByGenre',
    async ({id, page = 1}, thunkAPI) => {
        try {
            const res = await fetch(
                `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${id}&page=${page}`
            );
            if (!res.ok) {
                return thunkAPI.rejectWithValue(`HTTP ${res.status}`);
            }
            const data = (await res.json()) as IBaseResponse;
            return {
                results: data.results,
                page: data.page,
                total_pages: data.total_pages
            };
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue('Failed to fetch movies by genre!');
        }
    }
);

export const searchMovies = createAsyncThunk<
    MoviesWithPagination,
    { query: string; page?: number },
    { rejectValue: string }
>(
    'movies/searchMovies',
    async ({query, page = 1}, thunkAPI) => {
        try {
            const res = await fetch(
                `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}&page=${page}`
            );
            if (!res.ok) {
                return thunkAPI.rejectWithValue(`HTTP ${res.status}`);
            }
            const data = (await res.json()) as IBaseResponse;
            return {
                results: data.results,
                page: data.page,
                total_pages: data.total_pages
            };
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to search movies!');
        }
    }
);