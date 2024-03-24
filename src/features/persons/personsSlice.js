import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  persons: [],
  error: false,
};

export const fetchPersons = createAsyncThunk(
  "persons/fetchPersons",
  async () => {
    return await axios
      .get(
        `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_MOVIES_API}&language=en-US&page=1`
      )
      .then((res) => res.data.results);
  }
);

const personsSlice = createSlice({
  name: "persons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPersons.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPersons.fulfilled, (state, action) => {
      state.loading = false;
      state.persons = action.payload;
      state.error = false;
    });
    builder.addCase(fetchPersons.rejected, (state, action) => {
      state.loading = false;
      state.persons = [];
      state.error = action.error.message;
    });
  },
});

export default personsSlice.reducer;
