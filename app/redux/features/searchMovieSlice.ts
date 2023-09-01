import { MOVIESEARCHRESULTS } from "@/app/interface/movies";
import { createSlice } from "@reduxjs/toolkit";

const initialMovieSearchResults: MOVIESEARCHRESULTS[] = [];

export const searchMovieSlice = createSlice({
  initialState: initialMovieSearchResults,
  name: "searchMovie",
  reducers: {
    setSearchMovie: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSearchMovie } = searchMovieSlice.actions;

export default searchMovieSlice.reducer;
