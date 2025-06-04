import { TAccountType } from "../../../interfaces/accountType.interface";
import { TProduct } from "../../../interfaces/product.interface";
import { Category } from "../../../interfaces/category.interface";

export type TUpdateCategoryParams = {
  id: Category["id"];
  data: Partial<Omit<Category, "id">>;
};

export type TUpdateCategoryDiscount = {
  categoryId: TProduct["id"];
  accountTypeId: TAccountType["id"];
  discount: number;
};

export type TGetCategoriesResponse = {
  data: Category[];
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

export type TAddCategory = {
  name: string;
  photo?: string;
};

export type TGetCategoriesParams = {
  name?: string;
  ids?: string[];
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
