import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  topRatedSeries: [],
  error: "",
};
//https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>&language=en-US&page=1
export const fetchTopRatedSeries = createAsyncThunk(
  "topRatedSeries/fetchTopRatedSeries",
  async () => {
    return await axios
      .get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_MOVIES_API}&language=en-US&page=1`
      )
      .then((res) => res.data.results);
  }
);

const topRatedSeriesSlice = createSlice({
  name: "topRatedSeries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTopRatedSeries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTopRatedSeries.fulfilled, (state, action) => {
      state.loading = false;
      state.topRatedSeries = action.payload;
      state.error = "";
    });
    builder.addCase(fetchTopRatedSeries.rejected, (state, action) => {
      state.loading = false;
      state.topRatedSeries = [];
      state.error = action.error.message;
    });
  },
});

export default topRatedSeriesSlice.reducer;
