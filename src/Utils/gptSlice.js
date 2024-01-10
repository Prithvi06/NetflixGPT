import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        "showGptSearch": false,
        "movieNames": null,
        "movieResult": null,
    },
    reducers: {
        toggleGptSearch: (state, action) => {
            state.showGptSearch = !state.showGptSearch;
        },
        addGptMovieResult: (state, action) => {
            const {movieNames, movieResult} = action.payload;
            state.movieNames = movieNames;
            state.movieResult = movieResult;
        }
    }
});

export const { toggleGptSearch, addGptMovieResult } = gptSlice.actions;
export default gptSlice.reducer;