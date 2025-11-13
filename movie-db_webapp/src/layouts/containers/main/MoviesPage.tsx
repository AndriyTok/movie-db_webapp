import {Outlet} from "react-router";
import bgImage from "../../../images/movies-bg.jpg";
import Header from "../../../components/header/Header.tsx";
import MovieList from "../../../components/main/MovieList.tsx";

const MoviesPage = () => {
    return (
        <div
            className={"bg-cover lg:bg-center min-h-screen opacity-98"}
            style={{backgroundImage: `url(${bgImage})`}}>
            <Header/>
            <MovieList/>
            <Outlet/>
        </div>
    )
}

export default MoviesPage;