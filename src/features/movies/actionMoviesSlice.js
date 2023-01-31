import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  actionMovies: [],
  error: "",
};

export const fetchActionMovies = createAsyncThunk(
  "actionMovies/fetchActionMovies",
  async () => {
    return await axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIES_API}&with_genres=28`
      )
      .then((res) => res.data.results);
  }
);

const actionMoviesSlice = createSlice({
  name: "actionMovies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchActionMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchActionMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.actionMovies = action.payload;
      state.error = "";
    });
    builder.addCase(fetchActionMovies.rejected, (state, action) => {
      state.loading = false;
      state.actionMovies = [];
      state.error = action.error.message;
    });
  },
});

export default actionMoviesSlice.reducer;
