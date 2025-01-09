import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchUserStart, fetchUserSuccess, fetchUserFailure } = userSlice.actions;

// Async Thunk for Fetching User
export const fetchUser = () => async (dispatch) => {
  dispatch(fetchUserStart());
  try {
    const response = await axiosInstance.get('/users/1'); // Use only the endpoint
    dispatch(fetchUserSuccess(response.data));
  } catch (error) {
    dispatch(fetchUserFailure(error.message));
  }
};

export default userSlice.reducer;
