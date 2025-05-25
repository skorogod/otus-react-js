import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth/auth";
import { productsReducer } from "./slices/products/products";
import { cartReducer } from "./slices/cart/cart.slice";
import { categoriesReducer } from "./slices/categories/categoriesSlice";
import { profileReducer } from "./slices/profile/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    categories: categoriesReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
