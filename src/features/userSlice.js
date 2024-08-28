import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Update with your actual backend URL if needed
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (queryParams) => {
  const response = await axios.get('https://umbackend.onrender.com/api/users', { params: queryParams });
  return response.data;
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
    pagination: { totalPages: 0, currentPage: 1 },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.pagination = {
          totalPages: action.payload.totalPages,
          currentPage: action.payload.currentPage,
        };
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
