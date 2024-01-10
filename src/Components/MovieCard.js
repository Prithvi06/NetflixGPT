import { IMG_CDN_URL } from "../Utils/constants";

const MovieCard = ({ posterpath }) => {
    if (!posterpath) return null;
    return (
        <div className="w-48 pr-4">
            <img src={IMG_CDN_URL + posterpath} alt="Movie card" />
        </div>
    )
};

export default MovieCard;