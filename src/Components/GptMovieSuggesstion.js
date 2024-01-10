import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptSearchSuggesstion = () => {
    const {movieResult, movieNames} = useSelector((store) => store.gpt);

    if(!movieNames) return null;

    return (
        <div className="p-4 m-4 bg-black text-white bg-opacity-90">
            <div>
            {
                movieNames.map((movieName, index) => (
                    <MovieList 
                        key={movieName}
                        title={movieName}
                        movies={movieResult[index]}/>
                ))};
               <h1>{movieNames[0]}</h1>
               
            </div>
        </div>
    )
}

export default GptSearchSuggesstion;