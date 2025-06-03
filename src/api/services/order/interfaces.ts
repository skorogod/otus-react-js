import type { OrderStatus, Order } from "src/features/orders/state/interface";

export type TGetOrdersParams = {
  productIds?: string[];
  userId?: string;
  ids?: string[];
  status?: OrderStatus;
  pagination?: {
    pageSize?: number;
    pageNumber?: number;
  };
  createdAt?: {
    gte?: string; // от - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
    lte?: string; // до - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
  };
  updatedAt?: {
    gte?: string; // от - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
    lte?: string; // до - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
  };
  sorting?: {
    type: "ASC" | "DESC";
    field: "id" | "createdAt" | "updatedAt" | "name" | "date";
  };
};

export type TGetOrdersResponse = {
  data: Order[];
  pagination: {
    pageSize: number;
    pageNumber: number;
    total: number;
  };
  sorting: {
    type: "ASC" | "DESC";
    field: "id" | "createdAt" | "updatedAt" | "name";
  };
};

export type TAddOrderParams = {
  products: Array<{
    id: string;
    quantity: number;
  }>;
  status?: OrderStatus;
};

export type TUpdateOrderData = {
  productIds: string[];
  status: OrderStatus;
};

export type TUpdateOrderParams = {
  id: string;
  data: TUpdateOrderData;
};
