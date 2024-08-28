
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  domain: '',
  gender: '',
  available: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setDomain(state, action) {
      state.domain = action.payload;
    },
    setGender(state, action) {
      state.gender = action.payload;
    },
    setAvailable(state, action) {
      state.available = action.payload;
    },
    resetFilters(state) {
      return initialState;
    },
  },
});

export const { setQuery, setDomain, setGender, setAvailable, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
