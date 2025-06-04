import { TAddCategory } from "@/api/services/category/interfaces";
import { TUploadFileResponse } from "@/api/services/uploadFile/interfaces";

export type TAddCategoriesFormValues = {
  name: string;
  photo?: string | null;
};

export type TAddCategoriesFormProps = {
  className?: string;
  onSubmitCb: (data: TAddCategory) => void;
  onImageChangeCb?: (files: FileList) => Promise<TUploadFileResponse>;
};
