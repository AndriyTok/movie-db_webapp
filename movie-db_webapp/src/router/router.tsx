import {createBrowserRouter, type RouteObject} from "react-router";
import MoviesPage from "../layouts/containers/main/MoviesPage.tsx";
import MoviePage from "../layouts/pages/movie/MoviePage.tsx";

const routes: RouteObject[] = [
    {
        path: "/", element: <MoviesPage/>, children: [
            {path: '/movies', element: <MoviesPage/>},
            {path: '/movies/:id', element: <MoviePage/>},
            {path: '/movies/:genre', element: <MoviesPage/>},
            {path: '/search/:query', element: <MoviesPage/>},
        ]
    }
];

export const router = createBrowserRouter(routes)