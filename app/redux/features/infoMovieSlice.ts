import { createSlice } from "@reduxjs/toolkit";
import { INFOMOVIERESULTS } from "../../interface/movies";

const initialStateInfoMovie: INFOMOVIERESULTS[] = [];

export const infoMovieSlice = createSlice({
  initialState: initialStateInfoMovie,
  name: "infoMovie",
  reducers: {
    setInfoMovie: (state, action) => {
      return action.payload;
    },
  },
});

export const { setInfoMovie } = infoMovieSlice.actions;

export default infoMovieSlice.reducer;
