import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loadingSP: false,
  searched_persons: [],
  errorSP: false,
};

export const fetchSearchedPersons = createAsyncThunk(
  "searched_persons/fetchSearchedPersons",
  async (info) => {
    return await axios
      .get(
        `https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_MOVIES_API}&query=${info.searchValue}&language=en-US&page=1`
      )
      .then((res) => res.data.results);
  }
);

const personsSearchSlice = createSlice({
  name: "searched_persons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSearchedPersons.pending, (state) => {
      state.loadingSP = true;
    });
    builder.addCase(fetchSearchedPersons.fulfilled, (state, action) => {
      state.loadingSP = false;
      state.searched_persons = action.payload;
      state.errorSP = false;
    });
    builder.addCase(fetchSearchedPersons.rejected, (state, action) => {
      state.loadingSP = false;
      state.searched_persons = [];
      state.errorSP = action.error.message;
    });
  },
});

export default personsSearchSlice.reducer;
