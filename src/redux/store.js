import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import searchReducer from "./searchSlice";
import themeReducer from "./themeSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
    theme: themeReducer,
  },
});

export default store;
