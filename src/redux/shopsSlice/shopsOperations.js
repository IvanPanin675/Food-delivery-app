import { createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../services/API';

export const fetchAllShops = createAsyncThunk(
  'shops/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const {result} = await API.getAllShops();
      return result;
    } catch ({ response }) {
      return rejectWithValue(response.data.message);
    }
  }
);

