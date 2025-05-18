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
