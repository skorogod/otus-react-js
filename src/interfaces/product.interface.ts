import { Category } from "./category.interface";

export type TProduct = {
  id: string;
  title: string;
  costFull: number;
  costDiscount?: number;
  images: string[];
  description?: string;
  category?: Category;
};

export type TProductCardProps = Omit<TProduct, "images" | "id"> & {
  count: number;
  backgroundColor?: string;
  color?: string;
  image: string;
};
