import { TProduct } from "src/interfaces/product.interface";

export type TProductsState = {
  products: { [key: TProduct["id"]]: TProduct };
};
