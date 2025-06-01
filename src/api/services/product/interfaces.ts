import type { TProduct } from "src/interfaces/product.interface";

export type TGetProductsResponse = {
  data: TProduct[];
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

export type TNewProduct = Omit<
  TProduct,
  "id" | "createdAt" | "updatedAt" | "category"
> & {
  categoryId: string;
};

export type TGetProductsParams = {
  name?: string;
  ids?: string[];
  categoryIds?: string[];
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
