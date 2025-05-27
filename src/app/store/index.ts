import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth/auth";
import { productsReducer } from "../../features/products/state/productsSlice";
import { cartReducer } from "./slices/cart/cart.slice";
import { categoriesReducer } from "./slices/categories/categoriesSlice";
import { profileReducer } from "./slices/profile/profileSlice";
import { productsFiltersReducer } from "src/features/productsFilters/state/productsFiltersSlice";

export const store = configureStore({
  reducer: {
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
