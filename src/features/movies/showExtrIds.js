import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  showExternalIDS: {},
  error: "",
};

export const fetchshowshowExternalIDS = createAsyncThunk(
  "fetchshowExternalIDS/fetchshowshowExternalIDS",
  async (show) => {
    return await axios
      .get(
        `https://api.themoviedb.org/3/${show.type}/${show.id}/external_ids?api_key=${process.env.REACT_APP_MOVIES_API}`
      )
      .then((res) => res.data);
  }
);

const fetchshowExternalIDS = createSlice({
  name: "showExternalIDS",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchshowshowExternalIDS.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchshowshowExternalIDS.fulfilled, (state, action) => {
      state.loading = false;
      state.showExternalIDS = action.payload;
      state.error = "";
    });
    builder.addCase(fetchshowshowExternalIDS.rejected, (state, action) => {
      state.loading = false;
      state.showExternalIDS = {};
      state.error = action.error.message;
    });
  },
});

export default fetchshowExternalIDS.reducer;
