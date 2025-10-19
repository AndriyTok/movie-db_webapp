import {createAsyncThunk} from "@reduxjs/toolkit";
import type IMovie from "../../../models/movies/IMovie.ts";
import {movieService} from "../../../services/api.service.ts";


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
            return await movieService.getMovies(currentPage);
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
            return await movieService.getMoviesByGenre(id, page);
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
            return await movieService.searchMovies(query, page);
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to search movies!');
        }
    }
);