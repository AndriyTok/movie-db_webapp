import {configureStore} from "@reduxjs/toolkit";
import {movieSlice} from "./slices/movie/movieSlice.ts";


export const store = configureStore({
    reducer: {
        movieSlice: movieSlice.reducer,
        // genresSlice: genresSlice.reducer,
        // detailsSlice: detailsSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;