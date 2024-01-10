import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
    const movies = useSelector((store) => store.movies);

    return (
        movies.nowPlayingMovies && (
        <div className="bg-black">
            <div className="-mt-72 relative z-20 pl-12">
                <MovieList title={"UpComing"} movies={movies.upComingMovies} />
                <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
                <MovieList title={"TopRated"} movies={movies.topRatedMovies} />
                <MovieList title={"Popular"} movies={movies.popularMovies} />
                <MovieList title={"Trending"} movies={movies.nowPlayingMovies} />
            </div>
            {/* 
                MovieList = Popular
                    MovieCard * n
                MovieList = Now Playing
                MovieList = Trending
                MovieList = Horror

             */}
        </div>
        )
    );
};

export  default SecondaryContainer;