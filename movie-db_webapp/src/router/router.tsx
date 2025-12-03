import {createBrowserRouter, type RouteObject} from "react-router";
import MoviesPage from "../layouts/containers/main/MoviesPage.tsx";
import MoviePage from "../layouts/pages/movie/MoviePage.tsx";

const routes: RouteObject[] = [
    {path: "", element: <MoviesPage/>},
    {path: "/movie/:id", element: <MoviePage/>},
];

export const router = createBrowserRouter(routes);