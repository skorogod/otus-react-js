import { TProduct } from "../interfaces/product.interface";
import { TAccountType } from "../interfaces/accountType.interface";

type TParams = {
  accountType: TAccountType;
  product: TProduct;
};

export const calculateDiscount = ({ accountType, product }: TParams) => {
  if (product.oldPrice) {
    if (product.category && product.category.discount[accountType.name]) {
      return Number(
        (
          product.oldPrice *
          Math.min(
            (product.category.discount[accountType.name] || 0) +
              accountType.discount,
            0.99
          )
        ).toFixed(2)
      );
    }
  }
  return 0;
};
