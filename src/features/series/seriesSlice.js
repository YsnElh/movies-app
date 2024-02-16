import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  series: [],
  serieGenres: {},
  error: "",
};

export const fetchSeries = createAsyncThunk("series/fetchSeries", async () => {
  return await axios
    .get(
      `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_MOVIES_API}&language=en-US&page=1`
    )
    .then((res) => res.data.results);
});

export const fetchSerieGenres = createAsyncThunk(
  "serieGenres/fetchSerieGenres",
  async () => {
    return await axios
      .get(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.REACT_APP_MOVIES_API}&language=en-US`
      )
      .then((res) => res.data);
  }
);

const seriesSlice = createSlice({
  name: "series",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSeries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSeries.fulfilled, (state, action) => {
      state.loading = false;
      state.series = action.payload;
      state.error = "";
    });
    builder.addCase(fetchSeries.rejected, (state, action) => {
      state.loading = false;
      state.series = [];
      state.error = action.error.message;
    });

    builder.addCase(fetchSerieGenres.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSerieGenres.fulfilled, (state, action) => {
      state.loading = false;
      state.serieGenres = action.payload;
      state.error = "";
    });
    builder.addCase(fetchSerieGenres.rejected, (state, action) => {
      state.loading = false;
      state.serieGenres = null;
      state.error = action.error.message;
    });
  },
});

export default seriesSlice.reducer;
