import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  allBackDropsSerie: {},
  error: "",
};

export const fetchAllBackDropsSerie = createAsyncThunk(
  "allBackDropsSerie/fetchAllBackDropsSerie",
  async (SerieID) => {
    return await axios
      .get(
        `https://api.themoviedb.org/3/tv/${SerieID}/images?api_key=${process.env.REACT_APP_MOVIES_API}&language=en-US&&include_image_language=en,null`
      )
      .then((res) => res.data);
  }
);

const serieOneGetAllBackdrops = createSlice({
  name: "allBackDropsMovie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllBackDropsSerie.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllBackDropsSerie.fulfilled, (state, action) => {
      state.loading = false;
      state.allBackDropsSerie = action.payload;
      state.error = "";
    });
    builder.addCase(fetchAllBackDropsSerie.rejected, (state, action) => {
      state.loading = false;
      state.allBackDropsSerie = {};
      state.error = action.error.message;
    });
  },
});

export default serieOneGetAllBackdrops.reducer;
