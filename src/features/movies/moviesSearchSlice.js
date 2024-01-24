import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  moviesSearch: [],
  error: "",
};
export const fetchMoviesSearch = createAsyncThunk(
  "moviesSearch/fetchMoviesSearch",
  async (info) => {
    return await axios
      .get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: process.env.REACT_APP_MOVIES_API,
          query: info.searchValue,
        },
      })
      .then((res) => res.data.results);
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
