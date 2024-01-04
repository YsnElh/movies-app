import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  keywords: {},
  error: "",
};

export const fetchshowkeywords = createAsyncThunk(
  "fetchkeywords/fetchshowshowExternalIDS",
  async (show) => {
    return await axios
      .get(
        `https://api.themoviedb.org/3/${show.type}/${show.id}/keywords?api_key=${process.env.REACT_APP_MOVIES_API}`
      )
      .then((res) => res.data);
  }
);

const fetchkeywords = createSlice({
  name: "keywords",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchshowkeywords.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchshowkeywords.fulfilled, (state, action) => {
      state.loading = false;
      state.keywords = action.payload;
      state.error = "";
    });
    builder.addCase(fetchshowkeywords.rejected, (state, action) => {
      state.loading = false;
      state.keywords = {};
      state.error = action.error.message;
    });
  },
});

export default fetchkeywords.reducer;
