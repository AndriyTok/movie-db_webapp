// Стан (State)	genres: IGenre[], `activeGenreId: number	null, isLoading: boolean,
// error: string
// Асинхронні Thunks	fetchGenres()	createAsyncThunk
// Синхронні Reducers	`setActiveGenre(id: number	null)` (для кліку на жанр)

import type IGenre from "../../../models/genres/IGenre.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {fetchGenres} from "./genresThunks.ts";

type GenresSliceType = {
    genres: IGenre[];
    activeGenreId: number | null;
    isLoading: boolean;
    error: string | null;
}

export const initialState: GenresSliceType = {
    genres: [],
    activeGenreId: null,
    isLoading: false,
    error: null,
}

export const genresSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {
        setActiveGenre: (state, action: PayloadAction<number | null>) => {
            state.activeGenreId = action.payload;
        }
    },
    extraReducers: (builder) => {
        const handlePending = (state: GenresSliceType) => {
            state.isLoading = true;
            state.error = null;
        }

        const handleRejected = (state: GenresSliceType) => {
            state.isLoading = false;
            state.error = 'Failed to fetch movie details!';
        }

        builder
            .addCase(fetchGenres.pending, (state) => {
                handlePending(state);
            })
            .addCase(fetchGenres.fulfilled, (state, action) => {
                state.isLoading = false;
                state.genres = action.payload;
            })
            .addCase(fetchGenres.rejected, (state) => {
                handleRejected(state);
            });
    },
});

export const {setActiveGenre} = genresSlice.actions;
export default genresSlice.reducer;
