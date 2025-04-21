import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axios/axiosInstance';

// Async thunk for fetching all products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ keyword = '', page = 1 }, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/products', {
        params: { keyword, page },
      });

      if (response.data.success === false || response.status !== 200) {
        return thunkAPI.rejectWithValue(response.data.message || 'Failed to fetch products');
      }

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk for fetching a single product by ID
export const fetchSingleProduct = createAsyncThunk(
  'products/fetchSingleProduct',
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/product/${productId}`);

      if (response.data.success === false || response.status !== 200) {
        return thunkAPI.rejectWithValue(response.data.message || 'Failed to fetch product');
      }

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    singleProduct: null,
    resultPerPage: 0,
    totalProducts: 0,
    loading: false,
    error: null,
    singleProductLoading: false,
    singleProductError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // All products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.resultPerPage = action.payload.resultPerPage || 0;
        state.totalProducts = action.payload.productCount || 0;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong while fetching products';
      })

      // Single product
      .addCase(fetchSingleProduct.pending, (state) => {
        state.singleProductLoading = true;
        state.singleProductError = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.singleProductLoading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.singleProductLoading = false;
        state.singleProductError = action.payload || 'Failed to fetch single product';
      });
  },
});

export default productSlice.reducer;
