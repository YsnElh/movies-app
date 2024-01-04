import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  movieCrew: {},
  error: "",
};

export const fetchMovieCrew = createAsyncThunk(
  "fetchCrew/fetchMovieCrew",
  async (movie) => {
    return await axios
      .get(
        `https://api.themoviedb.org/3/${movie.type}/${movie.id}/credits?api_key=${process.env.REACT_APP_MOVIES_API}&language=en-US`
      )
      .then((res) => res.data);
  }
);

const fetchMovieCrewOne = createSlice({
  name: "movieCrew",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovieCrew.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMovieCrew.fulfilled, (state, action) => {
      state.loading = false;
      state.movieCrew = action.payload;
      state.error = "";
    });
    builder.addCase(fetchMovieCrew.rejected, (state, action) => {
      state.loading = false;
      state.movieCrew = {};
      state.error = action.error.message;
    });
  },
});

export default fetchMovieCrewOne.reducer;
