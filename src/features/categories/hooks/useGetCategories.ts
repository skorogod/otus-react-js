import { useEffect, useState } from "react";
import { categoryService } from "@/api/services/category/category.service";
import { Category } from "@/interfaces/category.interface";

export const useGetCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    categoryService.getAll({}).then((response) => setCategories(response.data));
  }, []);

  return categories;
};
