import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type IMovie from "../../../models/movies/IMovie.ts";
import {fetchMovies, fetchMoviesByGenre, searchMovies} from "./movieThunks.ts";
import {setActiveGenre} from "../genres/genresSlice.ts";

type MovieSliceType = {
    movies: IMovie[];
    currentPage: number;
    total_pages: number;
    isLoading: boolean;
    searchQuery: string;
}

export const initialState: MovieSliceType = {
    movies: [],
    currentPage: 1,
    total_pages: 1,
    isLoading: false,
    searchQuery: "",
};

export const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
            state.currentPage = 1;
        }
    },
    extraReducers: (builder) => {
        const handlePending = (state: MovieSliceType) => {
            state.isLoading = true;
        };
        const handleRejected = (state: MovieSliceType) => {
            state.isLoading = false;
        };
        builder
            .addCase(fetchMovies.pending, handlePending)
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.isLoading = false;
                state.movies = action.payload.results;
                state.currentPage = action.payload.page;
                state.total_pages = action.payload.total_pages;
            })
            .addCase(fetchMovies.rejected, handleRejected)

            .addCase(fetchMoviesByGenre.pending, handlePending)
            .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
                state.isLoading = false;
                state.movies = action.payload.results;
                state.currentPage = action.payload.page;
                state.total_pages = action.payload.total_pages;
            })
            .addCase(fetchMoviesByGenre.rejected, handleRejected)

            .addCase(searchMovies.pending, handlePending)
            .addCase(searchMovies.fulfilled, (state, action) => {
                state.isLoading = false;
                state.movies = action.payload.results;
                state.currentPage = action.payload.page;
                state.total_pages = action.payload.total_pages;
            })
            .addCase(searchMovies.rejected, handleRejected)

            .addCase(setActiveGenre, (state) => {
                state.currentPage = 1;
                state.searchQuery = "";
            });
    },
});

export const {setSearchQuery} = movieSlice.actions;
export default movieSlice.reducer;