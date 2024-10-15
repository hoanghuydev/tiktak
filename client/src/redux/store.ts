import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import rootReducer from './reducer';
import { setPostUpload } from '@/features/post/postSlice';
import socketMiddleware from '@/features/socket/socketMiddleware';
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setPostUpload'],
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        ignoredPaths: ['items.dates'],
      },
    }).concat([socketMiddleware]);
  },
});
export type AppDispatch = typeof store.dispatch;
