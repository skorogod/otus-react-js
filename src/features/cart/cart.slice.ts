import {
  createSelector,
  createSlice,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ICartState } from "./cart.types";
import { TProduct } from "../../interfaces/product.interface";
import { RootState } from "../../app/store";
import { AppStartListening } from "../../app/store/listenerMiddleware";

const preloadCartSlice = () => {
  try {
    const data = localStorage.getItem("productCart");
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};

const initialState: ICartState = preloadCartSlice() || {
  items: {},
  totalItems: 0,
  totalCost: 0,
  totalDiscount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increaseProductCartCount: (
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
    decreaseProductCartCount: (
      state,
      action: PayloadAction<{ product: TProduct; count: number }>
    ) => {
      const product = action.payload.product;
      const productId = product.id;

      if (state.items[productId]) {
        if (state.items[productId].quantity > 1) {
          state.items[productId].quantity -= 1;
        } else {
          state.items[productId].quantity = 0;
        }
        state.totalItems -= 1;
        state.totalCost -= product.price;

        if (product.oldPrice) {
          state.totalDiscount -= product.price - product.oldPrice;
        }
      }
    },
    setProductCartCount: (
      state,
      action: PayloadAction<{ product: TProduct; count: number }>
    ) => {
      state.items[action.payload.product.id].quantity = action.payload.count;
      let totalItems = 0;
      let totalDiscount = 0;
      let totalCost = 0;
      Object.values(state.items).forEach((item) => {
        totalItems += item.quantity;
        totalCost += item.quantity * item.product.price;
        if (item.product.oldPrice) {
          totalDiscount +=
            item.quantity * (item.product.oldPrice - item.product.price);
        }
      });
      state.totalCost = totalCost;
      state.totalDiscount = totalDiscount;
      state.totalItems = totalItems;
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

export const {
  increaseProductCartCount,
  decreaseProductCartCount,
  setProductCartCount,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

export const selectCartItems = (state: RootState) =>
  Object.values(state.cart.items);
export const selectCartProductsWithCount = createSelector(
  selectCartItems,
  (items) => items.map((item) => ({ ...item.product, counter: item.quantity }))
);

export const selectProductQuantity = (state: RootState, productId: string) =>
  state.cart.items[productId]?.quantity || 0;

export const addCartListeners = (startAppListening: AppStartListening) => {
  startAppListening({
    matcher: isAnyOf(
      updateQuantity,
      increaseProductCartCount,
      decreaseProductCartCount,
      setProductCartCount,
      removeFromCart,
      clearCart
    ),
    effect: (_, listenerApi) => {
      const state = listenerApi.getState() as RootState;
      const cart = state.cart;
      localStorage.setItem("productCart", JSON.stringify(cart));
    },
  });
};
