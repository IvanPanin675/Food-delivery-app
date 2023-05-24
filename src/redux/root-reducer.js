import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


import authReducer from './auth/authSlice';
import shopsReducer from './shopsSlice/shopsSlice';
import productsSlice from './products/productsSlice';
import ordersSlice from './orders/ordersSlice';



const persistConfig = {
  key: "root",
  storage,
  whitelist: ["token"],
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer)

export const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  shops: shopsReducer,
  products: productsSlice,
  orders: ordersSlice,
});
