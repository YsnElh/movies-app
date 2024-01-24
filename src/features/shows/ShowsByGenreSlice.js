import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  shows: [],
  error: "",
};

export const fetchShowsByGenre = createAsyncThunk(
  "showsByGenre/fetchShowsByGenre",
  async (info) => {
    return await axios
      .get(
        `https://api.themoviedb.org/3/discover/${info.type}?api_key=${process.env.REACT_APP_MOVIES_API}&with_genres=${info.genre}`
      )
      .then((res) => res.data.results);
  }
);

const showsByGenreSlice = createSlice({
  name: "showsByGenre",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchShowsByGenre.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchShowsByGenre.fulfilled, (state, action) => {
      state.loading = false;
      state.shows = action.payload;
      state.error = "";
    });
    builder.addCase(fetchShowsByGenre.rejected, (state, action) => {
      state.loading = false;
      state.shows = [];
      state.error = action.error ? action.error.message : "An error occurred";
    });
  },
});

export default showsByGenreSlice.reducer;
