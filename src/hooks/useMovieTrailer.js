import { useEffect } from "react";
import { API_OPTION } from "../Utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../Utils/moviesSlice";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    const trailerVideo = useSelector((store) => store.movies.trailerVideo);


    // fetch trailer video and update the store with tailer video data
    const getMovieVideos = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTION)
        const json = await data.json();
        const filterTrailer = json.results.filter(video => video.type === "Trailer");
        const trailer = filterTrailer.length ? filterTrailer[0] : json.results[0];
        dispatch(addTrailerVideo(trailer));
    }

    useEffect(() => {
        !trailerVideo && getMovieVideos();
    }, []);

}

export default useMovieTrailer;