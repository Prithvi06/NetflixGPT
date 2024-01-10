import { BG_URL } from "../Utils/constants";
import GptSearchSuggesstion from "./GptMovieSuggesstion";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
    return (
        <div>
            <div className="fixed -z-10">
                <img 
                    src={BG_URL}
                    alt="bg-imag"
                />
            </div>
            <GptSearchBar />
            <GptSearchSuggesstion />
        </div>
    )
}

export default GptSearch;