import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  series: [],
  error: "",
};

export const fetchSeries = createAsyncThunk("series/fetchSeries", () => {
  return axios
    .get(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_MOVIES_API}&language=en-US&page=1`
    )
    .then((res) => res.data.results);
});

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
  },
});

export default seriesSlice.reducer;
