// src/features/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

// Async thunk for fetching all products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('products');
      return response.data; // Assuming the API response contains a `data` field with products
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch products');
    }
  }
);

// Async thunk for fetching product details
export const productDetails = createAsyncThunk(
  'products/productDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`product/${id}`); // Corrected URL
      return response.data; // Assuming the API response contains a `data` field with product details
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch product details');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [], // List of products
    product: null, // Single product details
    loading: false,
    error: null,
    
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Product Details
      .addCase(productDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload; // Store single product details in `product`
      })
      .addCase(productDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
