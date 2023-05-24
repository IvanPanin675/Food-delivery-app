import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../services/API";

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (data, { rejectWithValue }) => {
    try {
      const result = await API.getProducts({ data });
      return result;
    } catch ({ response }) {
      return rejectWithValue(response.data.message);
    }
  }
);
