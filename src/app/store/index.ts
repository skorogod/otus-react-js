import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth/auth";
import { productsReducer } from "../../features/products/state/productsSlice";
import { cartReducer } from "../../features/cart/cart.slice";
import { categoriesReducer } from "src/features/categories/state/categoriesSlice";
import { profileReducer } from "./slices/profile/profileSlice";
import { productsFiltersReducer } from "src/features/productsFilters/state/productsFiltersSlice";
import { ordersReducer } from "src/features/orders/state/ordersSlice";

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    categories: categoriesReducer,
    profile: profileReducer,
    productsFilters: productsFiltersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
