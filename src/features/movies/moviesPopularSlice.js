import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  moviesPopular: [],
  error: "",
};

export const fetchMoviesPop = createAsyncThunk(
  "moviesPopular/fetchMoviesPop",
  async () => {
    return await axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIES_API}&language=en-US&page=1`
      )
      .then((res) => res.data.results);
  }
);

const moviesPopularSlice = createSlice({
  name: "moviesPopular",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMoviesPop.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMoviesPop.fulfilled, (state, action) => {
      state.loading = false;
      state.moviesPopular = action.payload;
      state.error = "";
    });
    builder.addCase(fetchMoviesPop.rejected, (state, action) => {
      state.loading = false;
      state.moviesPopular = [];
      state.error = action.error.message;
    });
  },
});

export default moviesPopularSlice.reducer;
