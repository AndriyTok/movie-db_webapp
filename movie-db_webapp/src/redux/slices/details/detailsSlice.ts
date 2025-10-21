// Стан (State)	`details: IMovieDetails	null, isLoading: boolean, error: string
// Асинхронні Thunks	fetchMovieDetails(movieId: number)	createAsyncThunk

import {createSlice} from "@reduxjs/toolkit";
import {fetchMovieDetails} from "./detailsThunks.ts";
import type {IMovieDetails} from "../../../models/movies/details/IMovieDetails.ts";

type DetailsSliceType = {
    details: IMovieDetails | null;
    isLoading: boolean;
    error: string | null;
}

export const initialState: DetailsSliceType = {
    details: null,
    isLoading: false,
    error: null,
}

export const detailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        const handlePending = (state: DetailsSliceType) => {
            state.isLoading = true;
            state.error = null;
        };
        const handleRejected = (state: DetailsSliceType) => {
            state.isLoading = false;
            state.error = 'Failed to fetch movie details!';
        };

        builder
            .addCase(fetchMovieDetails.pending, (state) => {
                handlePending(state);
            })
            .addCase(fetchMovieDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.details = action.payload;
            })
            .addCase(fetchMovieDetails.rejected, (state) => {
               handleRejected(state);
            });
},
})