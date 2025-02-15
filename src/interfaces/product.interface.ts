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

export type TProductDetailsProps = TProduct & {
  inStock: boolean
}

export type TProductCardProps = Omit<TProduct, "images"> & {
  count: number;
  backgroundColor?: string;
  color?: string;
  image: string;
};
