import { createSlice } from "@reduxjs/toolkit";
// import { fetchProducts } from "./productsOperations";

// const initialState = {
//   order: {},
//   isLoading: false,
//   error: null,
// };

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: {
      shop: "",
      products: [],
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    setShop(store, { payload }) {
      console.log("setShop", payload);
      store.orders.shop = payload;
    },
    setProducts(store, { payload }) {
      store.orders.products.push(payload);
    },
    deleteProducts(store, { payload }) {
      store.orders.products = store.orders.products.filter(
        (ob) => ob._id !== payload._id
      );
    },
    setProductQuantity(store, { payload }) {
      store.orders.products = store.orders.products.map((ob) => ob._id === payload._id ? {...ob, quantity: payload.quantity } : ob)
    },
  },

  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(fetchProducts.pending, (store) => {
  //         store.isLoading = true;
  //         store.error = null;
  //       })
  //       .addCase(fetchProducts.fulfilled, (store, { payload }) => {
  //         store.isLoading = false;
  //         store.items = payload;
  //       })
  //       .addCase(fetchProducts.rejected, (store, { payload }) => {
  //         store.isLoading = false;
  //         store.error = payload;
  //       });
  //   },
});

export const { setShop, setProducts, deleteProducts, setProductQuantity } =
  ordersSlice.actions;
export default ordersSlice.reducer;
