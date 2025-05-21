import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axios/axiosInstance';

// Async thunk to fetch Stripe API key
export const fetchStripeApiKey = createAsyncThunk(
  'stripe/fetchStripeApiKey',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/stripeapikey', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status !== 200) {
        return rejectWithValue('Failed to fetch Stripe API key');
      }

      return response.data.stripeApiKey;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const stripeSlice = createSlice({
  name: 'stripe',
  initialState: {
    apiKey: '',
    loading: false,
    error: null,
  },
  reducers: {
    resetStripeKey: (state) => {
      state.apiKey = '';
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStripeApiKey.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStripeApiKey.fulfilled, (state, action) => {
        state.loading = false;
        state.apiKey = action.payload;
      })
      .addCase(fetchStripeApiKey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetStripeKey } = stripeSlice.actions;

export default stripeSlice.reducer;
