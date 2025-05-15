import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [], // Array of items { productId, name, price, quantity, image }
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(item => item.productId === newItem.productId);

      if (existingItem) {
        existingItem.quantity += newItem.quantity || 1;
      } else {
        state.cartItems.push({ ...newItem, quantity: newItem.quantity || 1 });
      }

      cartSlice.caseReducers.calculateTotals(state);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.productId !== action.payload);
      cartSlice.caseReducers.calculateTotals(state);
    },

    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.cartItems.find(item => item.productId === productId);
      if (item && quantity > 0) {
        item.quantity = quantity;
        cartSlice.caseReducers.calculateTotals(state);
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },

    calculateTotals: (state) => {
      let quantity = 0;
      let price = 0;
      state.cartItems.forEach(item => {
        quantity += item.quantity;
        price += item.price * item.quantity;
      });
      state.totalQuantity = quantity;
      state.totalPrice = price;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
