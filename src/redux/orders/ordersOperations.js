import { createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../services/API';

export const addOrderOp = createAsyncThunk(
  'order/addOrder',
    async (data, { rejectWithValue }) => {
    try {
        const result = await API.addOrder(data);
      return result;
    } catch ({ response }) {
      return rejectWithValue(response.data.message);
    }
  }
);
