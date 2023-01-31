import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  movie: {},
  error: "",
};

export const fetchMovieOne = createAsyncThunk(
  "fetchMovie/fetchMovieOne",
  async (movieID) => {
    return await axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.REACT_APP_MOVIES_API}&language=en-US&page=1`
      )
      .then((res) => res.data);
  }
);

const movieOneSlice = createSlice({
  name: "movieOne",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovieOne.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMovieOne.fulfilled, (state, action) => {
      state.loading = false;
      state.movie = action.payload;
      state.error = "";
    });
    builder.addCase(fetchMovieOne.rejected, (state, action) => {
      state.loading = false;
      state.movie = {};
      state.error = action.error.message;
    });
  },
});

export default movieOneSlice.reducer;
