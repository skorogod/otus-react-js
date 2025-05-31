import { TAddCategory } from "src/api/services/category/interfaces";

export type TAddCategoriesFormValues = {
  name: string;
  photo?: File | null;
};

export type TAddCategoriesFormProps = {
  className?: string;
  onSubmitCb: (data: TAddCategory) => void;
};
