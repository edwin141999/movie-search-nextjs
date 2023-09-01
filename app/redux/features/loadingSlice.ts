import { createSlice } from "@reduxjs/toolkit";

const initialStateLoading = true;

export const loadingSlice = createSlice({
  initialState: initialStateLoading,
  name: "loading",
  reducers: {
    setLoading: (state, action) => {
      return action.payload;
    }
  }
})

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;