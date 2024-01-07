import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  videos: {},
  error: "",
};

export const fetchshowVedios = createAsyncThunk(
  "videos/fetchshowVedios",
  async (movie) => {
    return await axios
      .get(
        `https://api.themoviedb.org/3/${movie.type}/${movie.id}/videos?api_key=${process.env.REACT_APP_MOVIES_API}&language=en-US`
      )
      .then((res) => res.data);
  }
);

const fetchVedios = createSlice({
  name: "videos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchshowVedios.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchshowVedios.fulfilled, (state, action) => {
      state.loading = false;
      state.videos = action.payload;
      state.error = "";
    });
    builder.addCase(fetchshowVedios.rejected, (state, action) => {
      state.loading = false;
      state.videos = {};
      state.error = action.error.message;
    });
  },
});

export default fetchVedios.reducer;
