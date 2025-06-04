import { TNewProduct } from "@/api/services/product/interfaces";
import { TUploadFileResponse } from "@/api/services/uploadFile/interfaces";
import { Category } from "@/interfaces/category.interface";

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

export type TProducFormProps = {
  title?: string;
  submitBtnLabel?: string;
  defaultValues?: TProductFormValues;
  onSubmitCb: (data: TNewProduct) => void;
  onImageChangeCb?: (files: FileList) => Promise<TUploadFileResponse>;
  categories: Category[];
};
