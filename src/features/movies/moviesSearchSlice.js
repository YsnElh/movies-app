import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  moviesSearch: [],
  error: "",
};
export const fetchMoviesSearch = createAsyncThunk(
  "moviesSearch/fetchMoviesSearch",
  async (searchValue) => {
    return await axios
      .get(
        `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_MOVIES_API}&query=${searchValue}`
      )
      .then((res) => res.data.results.filter((e) => e.media_type !== "tv"));
  }
);

const moviesSearchSlice = createSlice({
  name: "moviesSearch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMoviesSearch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMoviesSearch.fulfilled, (state, action) => {
      state.loading = false;
      state.moviesSearch = action.payload;
      state.error = "";
    });
    builder.addCase(fetchMoviesSearch.rejected, (state, action) => {
      state.loading = false;
      state.moviesSearch = [];
      state.error = action.error.message;
    });
  },
});

export default moviesSearchSlice.reducer;
