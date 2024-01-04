import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  movieReviews: {},
  error: "",
};

export const fetchmovieReviews = createAsyncThunk(
  "fetchReviews/fetchmovieReviews",
  async (movie) => {
    return await axios
      .get(
        `https://api.themoviedb.org/3/${movie.type}/${movie.id}/reviews?api_key=${process.env.REACT_APP_MOVIES_API}&language=en-US`
      )
      .then((res) => res.data);
  }
);

const fetchMovieReviews = createSlice({
  name: "movieReviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchmovieReviews.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchmovieReviews.fulfilled, (state, action) => {
      state.loading = false;
      state.movieReviews = action.payload;
      state.error = "";
    });
    builder.addCase(fetchmovieReviews.rejected, (state, action) => {
      state.loading = false;
      state.movieReviews = {};
      state.error = action.error.message;
    });
  },
});

export default fetchMovieReviews.reducer;
