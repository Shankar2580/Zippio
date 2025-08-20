import { configureStore } from '@reduxjs/toolkit';
import videoSlice from './slices/videoSlice';
import userSlice from './slices/userSlice';
import uiSlice from './slices/uiSlice';
import authSlice from './slices/authSlice';
import socialMediaSlice from './slices/socialMediaSlice';

export const store = configureStore({
  reducer: {
    video: videoSlice,
    user: userSlice,
    ui: uiSlice,
    auth: authSlice,
    socialMedia: socialMediaSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;