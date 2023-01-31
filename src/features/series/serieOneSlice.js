import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  serie: {},
  error: "",
};

export const fetchSerieOne = createAsyncThunk(
  "fetchSerie/fetchSerieOne",
  async (serieID) => {
    return await axios
      .get(
        `https://api.themoviedb.org/3/tv/${serieID}?api_key=${process.env.REACT_APP_MOVIES_API}&language=en-US`
      )
      .then((res) => res.data);
  }
);

const serieOneSlice = createSlice({
  name: "serieOne",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSerieOne.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSerieOne.fulfilled, (state, action) => {
      state.loading = false;
      state.serie = action.payload;
      state.error = "";
    });
    builder.addCase(fetchSerieOne.rejected, (state, action) => {
      state.loading = false;
      state.serie = {};
      state.error = action.error.message;
    });
  },
});

export default serieOneSlice.reducer;
