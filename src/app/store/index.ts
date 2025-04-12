import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth/auth";
import { productsReducer } from "./slices/products/products";
import { cartReducer } from "./slices/cart/cart.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
