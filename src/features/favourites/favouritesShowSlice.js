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
        (e) =>
          e.id === action.payload.id && e.show_type === action.payload.show_type
      );
      if (arrDup.length === 0) {
        state.favouritesShow.push(action.payload);
        localStorage.setItem(
          "favouritesShow",
          JSON.stringify(state.favouritesShow)
        );
      }
    },
    removeFromFavourites: (state, action) => {
      state.favouritesShow = state.favouritesShow.filter(
        (show) =>
          !(
            show.id === action.payload.id &&
            show.show_type === action.payload.show_type
          )
      );
      localStorage.setItem(
        "favouritesShow",
        JSON.stringify(state.favouritesShow)
      );
    },

    destroyFavourites: (state) => {
      state.favouritesShow = [];
      localStorage.removeItem("favouritesShow");
    },
    initializeFavourites: (state) => {
      const storedFavourites = localStorage.getItem("favouritesShow");
      if (storedFavourites) {
        state.favouritesShow = JSON.parse(storedFavourites);
      }
    },
  },
});

export const {
  addToFavourites,
  removeFromFavourites,
  destroyFavourites,
  initializeFavourites,
} = favouritesShowSlice.actions;

export default favouritesShowSlice.reducer;
