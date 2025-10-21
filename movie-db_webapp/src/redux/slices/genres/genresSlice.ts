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
        builder
            .addCase(fetchGenres.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchGenres.fulfilled, (state, action) => {
                state.isLoading = false;
                state.genres = action.payload;
            })
            .addCase(fetchGenres.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Failed to fetch genres';
            });
    },
});

export const {setActiveGenre} = genresSlice.actions;
export default genresSlice.reducer;
