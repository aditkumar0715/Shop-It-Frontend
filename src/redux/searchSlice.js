import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    sortBy: "title",
    order: "asc",
    category: "",
  },
  reducers: {
    setSearchQuery(state, action) {
      state.query = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setOrder(state, action) {
      state.order = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    clearSearch(state) {
      state.query = "";
      state.sortBy = "title";
      state.order = "asc";
      state.category = "";
    },
  },
});

export const { setSearchQuery, setSortBy, setOrder, setCategory, clearSearch } =
  searchSlice.actions;
export default searchSlice.reducer;
