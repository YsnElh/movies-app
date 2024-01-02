import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  allBackDropsMovie: {},
  error: "",
};

export const fetchAllBackDropsMovie = createAsyncThunk(
  "allBackDropsMovie/fetchAllBackDropsMovie",
  async (movieID) => {
    return await axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieID}/images?api_key=${process.env.REACT_APP_MOVIES_API}&language=en-US&&include_image_language=en,null`
      )
      .then((res) => res.data);
  }
);

const movieOneGetAllBackdrops = createSlice({
  name: "allBackDropsMovie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllBackDropsMovie.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllBackDropsMovie.fulfilled, (state, action) => {
      state.loading = false;
      state.movie = action.payload;
      state.error = "";
    });
    builder.addCase(fetchAllBackDropsMovie.rejected, (state, action) => {
      state.loading = false;
      state.movie = {};
      state.error = action.error.message;
    });
  },
});

export default movieOneGetAllBackdrops.reducer;
