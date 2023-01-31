import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  topRatedMovies: [],
  error: "",
};
//https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>&language=en-US&page=1
export const fetchTopRatedMovies = createAsyncThunk(
  "topRatedMovies/fetchTopRatedMovies",
  async () => {
    return await axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_MOVIES_API}&language=en-US&page=1`
      )
      .then((res) => res.data.results);
  }
);

const topRatedMoviesSlice = createSlice({
  name: "topRatedMovies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTopRatedMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.topRatedMovies = action.payload;
      state.error = "";
    });
    builder.addCase(fetchTopRatedMovies.rejected, (state, action) => {
      state.loading = false;
      state.topRatedMovies = [];
      state.error = action.error.message;
    });
  },
});

export default topRatedMoviesSlice.reducer;
