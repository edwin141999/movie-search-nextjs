import { MOVIES } from "@/app/interface/movies";
import { createSlice } from "@reduxjs/toolkit";

const initialStateMovie: MOVIES = {
  adult: false,
  backdrop_path: "",
  belongs_to_collection: null,
  budget: 0,
  genres: [],
  homepage: "",
  id: 0,
  imdb_id: "",
  original_language: "",
  original_title: "",
  overview: null,
  popularity: 0,
  poster_path: null,
  production_companies: [],
  production_countries: [],
  release_date: "",
  revenue: 0,
  runtime: null,
  spoken_languages: [],
  status: "",
  tagline: null,
  title: "",
  video: false,
  vote_average: 0,
  vote_count: 0,
};

export const movieSlice = createSlice({
  initialState: initialStateMovie,
  name: "movie",
  reducers: {
    setMovie: (state, action) => {
      return action.payload;
    },
  },
});

export const { setMovie } = movieSlice.actions;

export default movieSlice.reducer;
