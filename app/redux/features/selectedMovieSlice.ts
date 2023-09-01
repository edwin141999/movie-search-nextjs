import { createSlice } from "@reduxjs/toolkit";

const initialSelectedMovieState = {
  name: "",
};

export const selectedMovieSlice = createSlice({
  name: "selectedMovie",
  initialState: initialSelectedMovieState,
  reducers: {
    setSelectedMovie: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setSelectedMovie } = selectedMovieSlice.actions;

export default selectedMovieSlice.reducer;
