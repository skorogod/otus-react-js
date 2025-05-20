import { TAccountType } from "src/interfaces/accountType.interface";
import { TProduct } from "src/interfaces/product.interface";
import { Category } from "src/interfaces/category.interface";

export type TUpdateCategoryParams = {
  id: Category["id"];
  data: Partial<Omit<Category, "id">>;
};

export type TUpdateCategoryDiscount = {
  categoryId: TProduct["id"];
  accountTypeId: TAccountType["id"];
  discount: number;
};

export type TGetCategoriesReponse = {
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
