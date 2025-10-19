import axios from "axios";
import type IMovie from "../models/movies/IMovie.ts";

export const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    params: {
        api_key: import.meta.env.VITE_BASE_API_KEY
    }
});

export type MoviesWithPagination = {
    results: IMovie[];
    page: number;
    total_pages: number;
}
