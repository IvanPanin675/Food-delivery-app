import { createAsyncThunk } from '@reduxjs/toolkit';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import * as API from '../../services/API';

export const register = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const result = await API.register(data);
      return result;
    } catch ({ response }) {
      Notify.failure(response.data.message);
      return rejectWithValue(response);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const result = await API.login(data);
      return result;
    } catch ({ response }) {
      Notify.failure(response.data.message);
      return rejectWithValue(response);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const data = await API.logout();
      return data;
    } catch ({ response }) {
      return rejectWithValue(response);
    }
  }
);

export const findUserOp = createAsyncThunk(
  'auth/user',
  async (email, { rejectWithValue }) => {
    try {
      console.log("auOPER EMAIL GO:",email)
      const data = await API.findUserAPI(email);
      console.log("auOPER DATA come :",email)
      return data;
    } catch ({ response }) {
      return rejectWithValue(response);
    }
  }
);