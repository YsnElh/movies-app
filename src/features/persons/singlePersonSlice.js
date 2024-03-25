import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  person: {},
  combinedCredits: [],
  error: false,
};

export const fetchPerson = createAsyncThunk(
  "person/fetchPerson",
  async (info) => {
    return await axios
      .get(
        `https://api.themoviedb.org/3/person/${info.id}?api_key=${process.env.REACT_APP_MOVIES_API}&language=en-US`
      )
      .then((res) => res.data);
  }
);

export const fetchPersonCombinedCredits = createAsyncThunk(
  "combinedCredits/fetchPersonCombinedCredits",
  async (info) => {
    return await axios
      .get(
        `https://api.themoviedb.org/3/person/${info.id}/combined_credits?api_key=${process.env.REACT_APP_MOVIES_API}&language=en-US`
      )
      .then((res) => res.data);
  }
);

const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Person
    builder.addCase(fetchPerson.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPerson.fulfilled, (state, action) => {
      state.loading = false;
      state.person = action.payload;
      state.error = false;
    });
    builder.addCase(fetchPerson.rejected, (state, action) => {
      state.loading = false;
      state.person = {};
      state.error = action.error.message;
    });
    //Combined Credits
    builder.addCase(fetchPersonCombinedCredits.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPersonCombinedCredits.fulfilled, (state, action) => {
      state.loading = false;
      state.combinedCredits = action.payload;
      state.error = false;
    });
    builder.addCase(fetchPersonCombinedCredits.rejected, (state, action) => {
      state.loading = false;
      state.combinedCredits = [];
      state.error = action.error.message;
    });
  },
});

export default personSlice.reducer;
