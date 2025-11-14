import { configureStore } from '@reduxjs/toolkit';
import invoicesSlice from './invoices/invoicesSlice';
import authSlice from './auth/authSlice';
import languageSlice from './language/languageSlice';

export const store = configureStore({
  reducer: {
    invoices: invoicesSlice,
    auth: authSlice,
    language: languageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
