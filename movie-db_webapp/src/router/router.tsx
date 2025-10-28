import {createBrowserRouter, type RouteObject} from "react-router";
import MoviesPage from "../layouts/containers/main/MoviesPage.tsx";
import MoviePage from "../layouts/pages/movie/MoviePage.tsx";
import MoviesByGenrePage from "../layouts/pages/genres/MoviesByGenresPage.tsx";
import SearchResultsPage from "../layouts/pages/search/SearchResultsPage.tsx";

const routes: RouteObject[] = [
    {
        path: "", element: <MoviesPage/>, children: [
            {path: '/movie/:id', element: <MoviePage/>},
            {path: '/:genre', element: <MoviesByGenrePage/>},
            {path: '/search/:query', element: <SearchResultsPage/>},
        ]
    },
];

export const router = createBrowserRouter(routes)