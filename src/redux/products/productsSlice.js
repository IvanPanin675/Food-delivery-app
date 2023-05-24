import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './productsOperations';



const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, store => {
        store.isLoading = true;
        store.error = null;
      })
      .addCase(fetchProducts.fulfilled, (store, { payload }) => {
        store.isLoading = false;
        store.items = payload;
      })
      .addCase(fetchProducts.rejected, (store, { payload }) => {
        store.isLoading = false;
        store.error = payload;
      });
  },
});

export default productsSlice.reducer;