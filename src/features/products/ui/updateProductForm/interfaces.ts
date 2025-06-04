import { TUpdateProductParams } from "../../../../api/services/product/interfaces";
import { TUploadFileResponse } from "../../../../api/services/uploadFile/interfaces";
import { Category } from "../../../../interfaces/category.interface";
import { TProduct } from "../../../../interfaces/product.interface";

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
