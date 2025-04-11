import { TBasicCardProps } from "src/shared/basicCard/basicCard.interface";
import { Category } from "./category.interface";
import { TProductType } from "src/interfaces/productType.interface";

export type TProduct = {
  id: string;
  title: string;
  costFull: number;
  costDiscount?: number;
  images: string[];
  description?: string;
  category?: Category;
  type: TProductType;
  count?: number;
};

export type TProductDetailsProps = TProduct & {
  inStock: number;
  onCountChange: (count: number) => void;
};

export type TProductCardProps = Omit<TProduct, "images"> &
  Omit<TBasicCardProps, "header" | "main" | "footer"> & {
    onCountChange: (count: number) => void;
  };
