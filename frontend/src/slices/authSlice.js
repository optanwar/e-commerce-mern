import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axios/axiosInstance';

// Async thunk for user login
export const loginUser = createAsyncThunk('auth/loginUser', async (userCredentials) => {
  const response = await axiosInstance.post('/login', userCredentials); // Replace with your API endpoint for login
  return response.data;
});

// Async thunk for user registration
export const registerUser = createAsyncThunk('registerUser', async (userDetails) => {
  const response = await axiosInstance.post('/register', userDetails); // Replace with your API endpoint for registration
  return response.data;
});

// Async thunk for forget password
export const forgotPassword = createAsyncThunk('forgotPassword', async (email) => {
  const response = await axiosInstance.post('/password/forgot', { email }); // Replace with your API endpoint for forget password
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    // Login handling
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Store user data on successful login
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Register handling
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = 'Registration successful, please log in!';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Forget password handling
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = 'Password reset instructions have been sent to your email.';
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;