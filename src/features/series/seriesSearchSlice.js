import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  seriesSearch: [],
  error: "",
};
export const fetchSeriesSearch = createAsyncThunk(
  "seriesSearch/fetchSeriesSearch",
  async (info) => {
    return await axios
      .get(
        `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_MOVIES_API}&query=${info.searchValue}`
      )
      .then((res) => res.data.results);
  }
);

const seriesSearchSlice = createSlice({
  name: "seriesSearch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSeriesSearch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSeriesSearch.fulfilled, (state, action) => {
      state.loading = false;
      state.seriesSearch = action.payload;
      state.error = "";
    });
    builder.addCase(fetchSeriesSearch.rejected, (state, action) => {
      state.loading = false;
      state.seriesSearch = [];
      state.error = action.error.message;
    });
  },
});

export default seriesSearchSlice.reducer;
