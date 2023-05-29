import { createSlice } from "@reduxjs/toolkit";
import { addOrderOp } from "./ordersOperations";

const initialState = {
  orders: {
    shop: "",
    products: [],
  },
  isLoading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setShop(store, { payload }) {
      store.orders.shop = payload;
      localStorage.setItem("shopName",payload)
    },
    setProducts(store, { payload }) {
      store.orders.products.push(payload);
      localStorage.setItem("products",JSON.stringify(store.orders.products))
    },
    setProductsLocal(store, { payload }) {
      store.orders.products=payload
    },
    deleteProducts(store, { payload }) {
      store.orders.products = store.orders.products.filter(
        (ob) => ob._id !== payload._id
      );
      localStorage.setItem("products",JSON.stringify(store.orders.products))
    },
    setProductQuantity(store, { payload }) {
      store.orders.products = store.orders.products.map((ob) =>
        ob._id === payload._id ? { ...ob, quantity: payload.quantity } : ob
      );
    }, 
    setPriceAll(store, { payload }) {
      store.orders.priceAll = payload;
    },
    setCustumer(store, { payload }) {
      store.orders = { ...store.orders, ...payload };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addOrderOp.pending, (store) => {
        store.isLoading = true;
        store.error = null;
      })
      .addCase(addOrderOp.fulfilled, (store, { payload }) => {
        store.isLoading = false;
        alert("You have successfully submitted your order. You can see orders by your email in page HISTORY")
      })
      .addCase(addOrderOp.rejected, (store, { payload }) => {
        store.isLoading = false;
        store.error = payload;
      });
  },
});

export const {
  setShop,
  setProducts,
  setProductsLocal,
  deleteProducts,
  setProductQuantity,
  setPriceAll,
  setCustumer,
} = ordersSlice.actions;
export default ordersSlice.reducer;
