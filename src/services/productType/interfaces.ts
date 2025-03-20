import { TAccountType } from "src/interfaces/accountType.interface";
import { TProduct } from "src/interfaces/product.interface";
import { TProductType } from "src/interfaces/productType.interface";

export type TUpdateProductTypeParams = {
  id: TProductType["id"];
  data: Partial<Omit<TProductType, "id">>;
};

export type TUpdateProductTypeDiscount = {
  producTypetId: TProduct["id"];
  accountTypeId: TAccountType["id"];
  discount: number;
};
