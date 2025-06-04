import { useEffect, useState } from "react";
import { categoryService } from "src/api/services/category/category.service";
import { Category } from "src/interfaces/category.interface";

export const useGetCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    categoryService.getAll({}).then((response) => setCategories(response.data));
  }, []);

  return categories;
};
