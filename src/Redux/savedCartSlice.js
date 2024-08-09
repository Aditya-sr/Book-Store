// src/savedCartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const savedCartSlice = createSlice({
  name: 'savedCart',
  initialState: {
    items: [],
  },
  reducers: {
    addItemToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeItemFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
  },
});

export const { addItemToCart, removeItemFromCart } = savedCartSlice.actions;

export default savedCartSlice.reducer;
