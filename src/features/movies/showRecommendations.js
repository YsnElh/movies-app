import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  showRecommendations: {},
  error: "",
};

export const fetchshowRecommendations = createAsyncThunk(
  "fetchRecommendations/fetchshowRecommendations",
  async (movie) => {
    return await axios
      .get(
        `https://api.themoviedb.org/3/${movie.type}/${movie.id}/recommendations?api_key=${process.env.REACT_APP_MOVIES_API}&language=en-US`
      )
      .then((res) => res.data);
  }
);

const fetchRecommendations = createSlice({
  name: "showRecommendations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchshowRecommendations.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchshowRecommendations.fulfilled, (state, action) => {
      state.loading = false;
      state.showRecommendations = action.payload;
      state.error = "";
    });
    builder.addCase(fetchshowRecommendations.rejected, (state, action) => {
      state.loading = false;
      state.showRecommendations = {};
      state.error = action.error.message;
    });
  },
});

export default fetchRecommendations.reducer;
