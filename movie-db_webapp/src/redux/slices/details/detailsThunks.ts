import {createAsyncThunk} from "@reduxjs/toolkit";
import type {IMovieDetails} from "../../../models/movies/details/IMovieDetails.ts";
import {movieDetailsService} from "../../../services/api.service.ts";

export const fetchMovieDetails = createAsyncThunk<
        IMovieDetails,
        number,
        { rejectValue: string }
>(
        'details/fetchMovieDetails',
        async (movieId, thunkAPI) => {
            try {
                return await movieDetailsService.getMovieDetails(movieId);
            } catch (error){
                console.log(error);
                return thunkAPI.rejectWithValue('Failed to fetch movie details');
            }
        }
);