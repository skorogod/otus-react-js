import { TProduct } from "src/interfaces/product.interface";
import { TAccountType } from "src/interfaces/accountType.interface";

type TParams = {
  accountType: TAccountType;
  product: TProduct;
};

export const calculateDiscount = ({ accountType, product }: TParams) => {
  if (product.category && product.category.discount[accountType.name]) {
    return Number(
      (
        product.price *
        Math.min(
          (product.category.discount[accountType.name] || 0) +
            accountType.discount,
          0.99
        )
      ).toFixed(2)
    );
  }
};
