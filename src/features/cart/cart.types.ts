import { TProduct } from "@/interfaces/product.interface";

export interface ICartItem {
  product: TProduct;
  quantity: number;
}

export interface ICartState {
  items: Record<string, ICartItem>;
  totalItems: number;
  totalCost: number;
  totalDiscount: number;
}
