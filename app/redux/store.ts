import { configureStore } from "@reduxjs/toolkit";
import { infoMovieSlice } from "./features/infoMovieSlice";
import { searchMovieSlice } from "./features/searchMovieSlice";
import { selectedMovieSlice } from "./features/selectedMovieSlice";
import { movieSlice } from "./features/movieSlice";
import { loadingSlice } from "./features/loadingSlice";

export const makeStore = configureStore({
  reducer: {
    infoMovieSlice: infoMovieSlice.reducer,
    selectedMovieSlice: selectedMovieSlice.reducer,
    searchMovieSlice: searchMovieSlice.reducer,
    movieSlice: movieSlice.reducer,
    loadingSlice: loadingSlice.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof makeStore.getState>;
export type AppDispatch = typeof makeStore.dispatch;
