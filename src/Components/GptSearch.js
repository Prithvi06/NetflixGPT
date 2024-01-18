import { BG_URL } from "../Utils/constants";
import GptSearchSuggesstion from "./GptMovieSuggesstion";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
    return (
        <>
            <div className="fixed -z-10">
                <img 
                    src={BG_URL}
                    alt="bg-imag"
                    className="h-screen w-screen object-cover"
                />
            </div>
            <div className="">
                <GptSearchBar />
                <GptSearchSuggesstion />
            </div>
        </>
    )
}

export default GptSearch;