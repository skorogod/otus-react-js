import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth/auth";
import { productsReducer } from "../../features/products/state/productsSlice";
import { cartReducer } from "../../features/cart/cart.slice";
import { categoriesReducer } from "../../features/categories/state/categoriesSlice";
import { profileReducer } from "./slices/profile/profileSlice";
import { productsFiltersReducer } from "../../features/productsFilters/state/productsFiltersSlice";
import { ordersReducer } from "../../features/orders/state/ordersSlice";
import { listenerMiddleware } from "./listenerMiddleware";

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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
