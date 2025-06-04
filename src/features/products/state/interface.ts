import { TProduct } from "../../../interfaces/product.interface";

export type TProductsState = {
  products: { [key: TProduct["id"]]: TProduct };
};
