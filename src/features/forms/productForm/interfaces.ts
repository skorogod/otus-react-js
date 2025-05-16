import { TNewProduct } from "src/api/services/product/interfaces";
import { Category } from "src/interfaces/category.interface";

export type TProductFormValues = {
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  photos: File[];
  mainImageIndex: number;
  category: string;
};

export type TAddProducFormProps = {
  onSubmitCb: (data: TNewProduct) => void;
  categories: Category[];
};
