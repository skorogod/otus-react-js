import { TBasicCardProps } from "src/shared/basicCard/basicCard.interface";
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
  inStock: boolean;
};

export type TProductCardProps = Omit<TProduct, "images"> &
  Omit<TBasicCardProps, "header" | "main" | "footer"> & {
    count: number;
  };
