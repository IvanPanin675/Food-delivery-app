import { Route, Routes } from "react-router-dom";
import "./App.css";

import SharedLayout from "./components/SharedLoyaut/SharedLoyaut";
import ShopPage from "./Pages/ShopPage";
import ShoppingCartPage from "./Pages/ShoppingCartPage";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shopping" element={<ShoppingCartPage/>} />
      </Route>
    </Routes>
  );
};
