import { TUpdateProductParams } from "src/api/services/product/interfaces";
import { TUploadFileResponse } from "src/api/services/uploadFile/interfaces";
import { Category } from "src/interfaces/category.interface";
import { TProduct } from "src/interfaces/product.interface";

export type TProductFormValues = {
  name: string;
  description: string;
  oldPrice: number;
  discount: number;
  stock: number;
  photo: string | null;
  mainImageIndex: number;
  categoryId: string;
};

export type TUpdateProducFormProps = {
  product: TProduct;
  title?: string;
  submitBtnLabel?: string;
  defaultValues?: TProductFormValues;
  onSubmitCb: ({ id, data }: TUpdateProductParams) => void;
  onImageChangeCb?: (files: FileList) => Promise<TUploadFileResponse>;
  categories: Category[];
};
