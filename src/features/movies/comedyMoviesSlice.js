import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  comedyMovies: [],
  error: "",
};

export const fetchComedyMovies = createAsyncThunk(
  "comedyMovies/fetchComedyMovies",
  async () => {
    return await axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIES_API}&with_genres=35`
      )
      .then((res) => res.data.results);
  }
);

const comedyMoviesSlice = createSlice({
  name: "comedyMovies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComedyMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchComedyMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.comedyMovies = action.payload;
      state.error = "";
    });
    builder.addCase(fetchComedyMovies.rejected, (state, action) => {
      state.loading = false;
      state.comedyMovies = [];
      state.error = action.error.message;
    });
  },
});

export default comedyMoviesSlice.reducer;
