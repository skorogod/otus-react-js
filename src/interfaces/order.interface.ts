import type { User } from "./user.interface";
import type { TProduct } from "./product.interface";

export type Order = {
  id: string;
  products: OrderProduct[];
  user: User;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  commandId: string;
};

type OrderProduct = {
  _id: string; // служебный id - это не id продукта
  product: TProduct;
  quantity: number;
};

enum OrderStatus {
  PendingConfirmation = "pending_confirmation",
  Processing = "processing",
  Packaging = "packaging",
  WaitingForDelivery = "waiting_for_delivery",
  InTransit = "in_transit",
  Delivered = "delivered",
  ReturnRequested = "return_requested",
  OrderCancelled = "order_cancelled",
}
