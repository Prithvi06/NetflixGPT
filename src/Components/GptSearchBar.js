import { useDispatch, useSelector } from "react-redux";
import lang from "../Utils/languageConstant";
import { useRef } from "react";
import openai from "../Utils/openai";
import { API_OPTION } from "../Utils/constants";
import { addGptMovieResult } from "../Utils/gptSlice";

const GptSearchBar = () => {
    const langKey = useSelector((store) => store.config.lang);
    const searchText = useRef(null);
    const dispatch = useDispatch();

    // Seach movie in TMDB
    const searchMovieTMDB = async (movie) => {
        const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`, API_OPTION);
        const json = await data.json();
        return json.results;
    }

    const handleGptSearch = async () => {
        const gptQuery = "Act as a movie Recommendation system and suggest some movie for the query " +
            searchText.current.value +
            ". only give me name of five movies, comma seperated like the example result ahead. Example result: Gadar, Animal, Sholay, Don, Koi Mil Gaya."

        const gptResult = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery }],
            model: 'gpt-3.5-turbo',
        });

        if(!gptResult.choices) {
            alert("Movie not found");
        }

        const gtpMoviesList = gptResult.choices?.[0]?.message?.content.split(",");
        // For each movie search TMDB API
        const promiseArrayData = gtpMoviesList.map((movie) => searchMovieTMDB(movie));
    
        const tmdbResults = await Promise.all(promiseArrayData);
        console.log("tmdbResults", tmdbResults)
        dispatch(addGptMovieResult({movieNames: gtpMoviesList, movieResult: tmdbResults}));
    }

    return (
        <div className="pt-[10%] text-center">
            <form className="bg-black w-1/2 m-auto grid grid-cols-12" onSubmit={(e) => e.preventDefault()}>
                <input ref={searchText} type="text" className="p-3 m-3 col-span-9" placeholder={lang[langKey].placeholder}/>
                <button className="py-2 px-3 m-3 col-span-3 bg-red-700 text-white rounded-lg" onClick={handleGptSearch}>
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    )
}

export default GptSearchBar;