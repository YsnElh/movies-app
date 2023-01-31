import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favouritesShow: [],
};

const favouritesShowSlice = createSlice({
  name: "favouritesShow",
  initialState,
  reducers: {
    addToFavourites: (state, action) => {
      const arrDup = state.favouritesShow.filter(
        (e) => e.id === action.payload.id
      );
      if (arrDup.length === 0) {
        state.favouritesShow.push(action.payload);
      }
      //state.favouritesShow.push(action.payload);

      //
    },
    removeFromFavourites: (state, action) => {
      return {
        favouritesShow: state.favouritesShow.filter(
          (show) => show.id !== action.payload
        ),
      };
    },
    destroyFavourites: (state) => {
      return {
        favouritesShow: [],
      };
    },
  },
});

export const { addToFavourites, removeFromFavourites, destroyFavourites } =
  favouritesShowSlice.actions;
export default favouritesShowSlice.reducer;
