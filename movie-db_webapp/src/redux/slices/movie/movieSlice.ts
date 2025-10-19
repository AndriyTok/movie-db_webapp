import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type IMovie from "../../../models/movies/IMovie.ts";
import {fetchMovies, fetchMoviesByGenre, searchMovies} from "./movieThunks.ts";

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
            // fetchMovies
            .addCase(fetchMovies.pending, (state) => {
                handlePending(state);
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.isLoading = false;
                state.movies = action.payload.results;
                state.currentPage = action.payload.page;
                state.total_pages = action.payload.total_pages;
            })
            .addCase(fetchMovies.rejected, (state) => {
                handleRejected(state);
            })

            // fetchMoviesByGenre
            .addCase(fetchMoviesByGenre.pending, (state) => {
                handlePending(state);
            })
            .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
                state.isLoading = false;
                state.movies = action.payload.results;
                state.currentPage = action.payload.page;
                state.total_pages = action.payload.total_pages;
            })
            .addCase(fetchMoviesByGenre.rejected, (state) => {
                handleRejected(state);
            })

            // searchMovies
            .addCase(searchMovies.pending, (state) => {
                handlePending(state);
            })
            .addCase(searchMovies.fulfilled, (state, action) => {
                state.isLoading = false;
                state.movies = action.payload.results;
                state.currentPage = action.payload.page;
                state.total_pages = action.payload.total_pages;
            })
            .addCase(searchMovies.rejected, (state) => {
                handleRejected(state);
            });
    },
});

export const {setSearchQuery} = movieSlice.actions;
export default movieSlice.reducer;