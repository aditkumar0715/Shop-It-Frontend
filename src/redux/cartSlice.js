import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
  totalQuantity:
    JSON.parse(localStorage.getItem("cartItems"))?.reduce(
      (acc, item) => acc + item.quantity,
      0
    ) || 0,
  totalPrice:
    JSON.parse(localStorage.getItem("cartItems"))?.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    ) || 0,
};

const updateLocalStorage = (items) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({ ...newItem, quantity: 1 });
        updateLocalStorage(state.items);
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      state.totalQuantity = state.items.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      updateLocalStorage(state.items);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
        state.totalQuantity = state.items.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        state.totalPrice = state.items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        updateLocalStorage(state.items);
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
