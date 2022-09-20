import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import postSlice from './slices/postSlice';
import commentSlice from './slices/commentSlice';

export const store = configureStore({
  reducer: {
    userSlice,
    postSlice,
    commentSlice
  },
})