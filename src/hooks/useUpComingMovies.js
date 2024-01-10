import { useDispatch, useSelector } from "react-redux";
import { addUpComingMovies } from "../Utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTION } from "../Utils/constants";

const useUpComingMovies = () => {
    const dispatch = useDispatch();
    const upComingMovies = useSelector((store) => store.movies.upComingMovies);

    const getUpComingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', API_OPTION );
        const json = await data.json();
        dispatch(addUpComingMovies(json?.results));
    };

    useEffect(() => {
        !upComingMovies && getUpComingMovies();
    }, []);
};

export default useUpComingMovies;