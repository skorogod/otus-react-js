import { TBasicCardProps } from "src/shared/basicCard/basicCard.interface";
import { Category } from "./category.interface";

export type TProduct = {
  id: string;
  name: string;
  photo: string;
  photos?: string[];
  desc?: string;
  createdAt: Date;
  updatedAt: Date;
  oldPrice?: number;
  price: number;
  commandId?: string;
  category: Category;
};

export type TProductDetailsProps = TProduct & {
  inStock: number;
  onCountChange: (count: number) => void;
};

export type TProductCardProps = Omit<
  TProduct,
  "images" | "createdAt" | "updatedAt" | "commandId"
> &
  Omit<TBasicCardProps, "header" | "main" | "footer"> & {
    onCountChange: (count: number) => void;
  };
