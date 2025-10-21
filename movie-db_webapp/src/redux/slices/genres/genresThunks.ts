import {createAsyncThunk} from "@reduxjs/toolkit";
import type IGenre from "../../../models/genres/IGenre.ts";
import {genreService} from "../../../services/api.service.ts";


export const fetchGenres = createAsyncThunk<
    IGenre[],
    void,
    { rejectValue: string }
>(
    'genres/fetchGenres',
    async (_, thunkAPI) => {
        try {
            return await genreService.getGenres();
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue('Failed to fetch genres!');
        }
    }
);