
const VideoTitle = ({title, overview}) => {
    return (
        <div className="w-full aspect-video pt-[15%] px-20 absolute text-white bg-gradient-to-r from-black">
            <h1 className="text-5xl font-bold">{title}</h1>
            <p className="py-6 text-md w-1/3">{overview}</p>
            <div>
                <button className="p-2 px-8  bg-white text-black text-xl rounded-lg hover:opacity-80">▶︎ Play</button>
                <button className="mx-2 p-2 px-8  bg-gray-500 text-white text-xl bg-opacity-50 rounded-lg">More Info</button>
            </div>
        </div>
    )
};

export  default VideoTitle;