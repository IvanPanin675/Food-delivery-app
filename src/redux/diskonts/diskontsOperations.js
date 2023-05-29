import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../services/API";

export const fetchDiskonts = createAsyncThunk(
  "diskonts/fetchAllDiskonts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.getDiskonts();
      return data;
    } catch ({ response }) {
      return rejectWithValue(response.data.message);
    }
  }
);
