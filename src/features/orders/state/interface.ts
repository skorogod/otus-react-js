import type { TProduct } from "@/interfaces/product.interface";
import type { TProfile } from "@/app/store/slices/auth/interface";

export type Order = {
  id: string;
  products: OrderProduct[];
  user: TProfile;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  commandId: string;
};

export type OrderProduct = {
  _id: string; // служебный id - это не id продукта
  product: TProduct;
  quantity: number;
};

export enum OrderStatus {
  PendingConfirmation = "pending_confirmation",
  Processing = "processing",
  Packaging = "packaging",
  WaitingForDelivery = "waiting_for_delivery",
  InTransit = "in_transit",
  Delivered = "delivered",
  ReturnRequested = "return_requested",
  OrderCancelled = "order_cancelled",
}
