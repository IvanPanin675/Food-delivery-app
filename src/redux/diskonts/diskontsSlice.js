import { createSlice } from '@reduxjs/toolkit';
import { fetchDiskonts } from './diskontsOperations';

const diskontsSlice = createSlice({
  name: 'diskonts',
  initialState: {
    items: [],
    setItem: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    setDiskontSlice(store, { payload }) {
      store.setItem = payload;
    },
    deleteDiskontSlice(store) {
      store.setItem = {};
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDiskonts.pending, store => {
        store.isLoading = true;
        store.error = null;
      })
      .addCase(fetchDiskonts.fulfilled, (store, { payload }) => {
        store.isLoading = false;
        store.items = payload;
      })
      .addCase(fetchDiskonts.rejected, (store, { payload }) => {
        store.isLoading = false;
        store.error = payload;
      });
  },
});

export const {
  setDiskontSlice,
  deleteDiskontSlice
} = diskontsSlice.actions;

export default diskontsSlice.reducer;