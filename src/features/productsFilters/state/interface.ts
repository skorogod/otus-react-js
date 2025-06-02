export type TProductsFiltersState = {
  sortType: "ASC" | "DESC";
  sortField: "id" | "createdAt" | "updatedAt" | "name";
  name: string;
  categoryIds?: string[];
};
