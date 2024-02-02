import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  moviesPopular: [],
  movieGenres: {},
  error: false,
};

export const fetchMoviesPop = createAsyncThunk(
  "moviesPopular/fetchMoviesPop",
  async () => {
    return await axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_MOVIES_API}&language=en-US&page=1`
      )
      .then((res) => res.data.results);
  }
);

export const fetchMovieGenres = createAsyncThunk(
  "movieGenres/fetchMovieGenres",
  async () => {
    return await axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIES_API}&language=en-US`
      )
      .then((res) => res.data);
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
      state.error = false;
    });
    builder.addCase(fetchMoviesPop.rejected, (state, action) => {
      state.loading = false;
      state.moviesPopular = [];
      state.error = action.error.message;
    });

    builder.addCase(fetchMovieGenres.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMovieGenres.fulfilled, (state, action) => {
      state.loading = false;
      state.movieGenres = action.payload;
      state.error = "";
    });
    builder.addCase(fetchMovieGenres.rejected, (state, action) => {
      state.loading = false;
      state.movieGenres = null;
      state.error = action.error.message;
    });
  },
});

export default moviesPopularSlice.reducer;
