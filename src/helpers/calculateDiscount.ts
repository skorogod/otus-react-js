import { TProduct } from "src/interfaces/product.interface";
import { TAccountType } from "src/interfaces/accountType.interface";

type TParams = {
  accountType: TAccountType;
  product: TProduct;
};

export const calculateDiscount = ({ accountType, product }: TParams) => {
  if (product.type && product.type.discount[accountType.name]) {
    return Number(
      (
        product.costFull *
        Math.min(
          (product.type.discount[accountType.name] || 0) + accountType.discount,
          0.99
        )
      ).toFixed(2)
    );
  }
};
