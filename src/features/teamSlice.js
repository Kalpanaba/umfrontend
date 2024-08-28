import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createTeam = createAsyncThunk('teams/createTeam', async (teamData) => {
  const response = await axios.post('https://umbackend.onrender.com/api/team', teamData);
  return response.data;
});

const teamSlice = createSlice({
  name: 'teams',
  initialState: {
    team: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.team = action.payload;
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default teamSlice.reducer;