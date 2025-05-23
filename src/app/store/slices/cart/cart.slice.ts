import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartState } from "./cart.types";
import { TProduct } from "src/interfaces/product.interface";
import { RootState } from "../..";

const initialState: ICartState = {
  items: {},
  totalItems: 0,
  totalCost: 0,
  totalDiscount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: TProduct; count: number }>
    ) => {
      const product = action.payload.product;
      const productId = product.id;

      if (state.items[productId]) {
        state.items[productId].quantity += 1;
        state.totalItems += 1;
        state.totalCost += product.price;

        if (product.oldPrice) {
          state.totalDiscount += product.price - product.oldPrice;
        }
      } else {
        state.items[productId] = {
          product,
          quantity: 1,
        };
        state.totalItems += 1;
        state.totalCost += product.price;

        if (product.oldPrice) {
          state.totalDiscount += product.price - product.oldPrice;
        }
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const cartItem = state.items[productId];

      if (cartItem) {
        const { product, quantity } = cartItem;

        delete state.items[productId];
        state.totalItems -= quantity;
        state.totalCost -= product.price * quantity;

        if (product.oldPrice) {
          state.totalDiscount -= (product.price - product.oldPrice) * quantity;
        }
      }
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const cartItem = state.items[productId];

      if (cartItem) {
        const { product } = cartItem;
        const oldQuantity = cartItem.quantity;
        const quantityDiff = quantity - oldQuantity;

        if (quantityDiff !== 0) {
          cartItem.quantity = quantity;
          state.totalItems += quantityDiff;
          state.totalCost += product.price * quantityDiff;

          if (product.oldPrice) {
            state.totalDiscount +=
              (product.price - product.oldPrice) * quantityDiff;
          }
        }
      }
    },

    clearCart: (state) => {
      state.items = {};
      state.totalItems = 0;
      state.totalCost = 0;
      state.totalDiscount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;

export const selectCartItems = (state: RootState) =>
  Object.values(state.cart.items);
export const selectCartProductsWithCount = createSelector(
  selectCartItems,
  (items) => items.map((item) => ({ ...item.product, counter: item.quantity }))
);

export const selectProductQuantity = (state: RootState, productId: string) =>
  state.cart.items[productId]?.quantity || 0;
