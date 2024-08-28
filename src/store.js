import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import teamReducer from './features/teamSlice';
import filterReducer from './features/filterSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    teams: teamReducer,
    filters: filterReducer,
  },
});
