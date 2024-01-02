import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

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
        Cookies.set("favouritesShow", JSON.stringify(state.favouritesShow));
      }
    },
    removeFromFavourites: (state, action) => {
      state.favouritesShow = state.favouritesShow.filter(
        (show) => show.id !== action.payload
      );
      Cookies.set("favouritesShow", JSON.stringify(state.favouritesShow));
    },
    destroyFavourites: (state) => {
      state.favouritesShow = [];
      Cookies.remove("favouritesShow");
    },
    initializeFavourites: (state) => {
      const storedFavourites = Cookies.get("favouritesShow");
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
