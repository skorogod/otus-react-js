import { createListenerMiddleware, addListener } from "@reduxjs/toolkit";
import { RootState, AppDispatch } from ".";
import { addCartListeners } from "../../features/cart/cart.slice";

export const listenerMiddleware = createListenerMiddleware();

export const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch
>();

export type AppStartListening = typeof startAppListening;
export const addAppListener = addListener.withTypes<RootState, AppDispatch>();
export type AppAddListener = typeof addAppListener;

addCartListeners(startAppListening);
