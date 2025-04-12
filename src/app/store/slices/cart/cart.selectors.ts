import { RootState } from "../..";

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartTotalItems = (state: RootState) => state.cart.totalItems;

export const selectCartTotalCost = (state: RootState) => state.cart.totalCost;

export const selectCartTotalDiscount = (state: RootState) =>
  state.cart.totalDiscount;

export const selectProductQuantity = (state: RootState, productId: string) => {
  const cartItem = state.cart.items[productId];
  return cartItem ? cartItem.quantity : 0;
};
