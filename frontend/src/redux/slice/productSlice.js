import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import axios from 'axios';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchProductStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchProductFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchProductStart, fetchProductSuccess, fetchProductFailure } = productSlice.actions;

// Async Thunk for Fetching Products
export const fetchProducts = () => async (dispatch) => {
  dispatch(fetchProductStart());
  try {
    const response = await axiosInstance.get('/products'); // Replace with your actual endpoint
   
    dispatch(fetchProductSuccess(response.data));
  } catch (error) {
    dispatch(fetchProductFailure(error.message));
  }
};

export default productSlice.reducer;
