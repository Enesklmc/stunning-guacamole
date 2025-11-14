import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface InvoicesState {
  invoices: [] | null;
}

const initialState: InvoicesState = {
  invoices: null,
};

export const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    setInvoices: (state, action: PayloadAction<[] | null>) => {
      state.invoices = action.payload;
    },
  },
});

export const { setInvoices } = invoicesSlice.actions;

export const selectInvoices = (state: RootState) => state.invoices.invoices;

export default invoicesSlice.reducer;
