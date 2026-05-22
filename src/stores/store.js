import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import topupReducer from './slices/topupSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    topup: topupReducer,
  },
});