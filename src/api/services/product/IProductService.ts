import { TProduct } from "src/interfaces/product.interface";
import { TGetReourceParams } from "../common.interface";
import { TGetProductsResponse, TNewProduct } from "./interfaces";

export interface IProductService {
  getAll({ page, limit }: TGetReourceParams): Promise<TGetProductsResponse>;
  getById(id: string): Promise<TProduct>;
  create(product: TNewProduct): Promise<TProduct>;
  update(id: string, product: Partial<TProduct>): Promise<TProduct>;
  delete(id: string): Promise<void>;
  getByCategory(category: string): Promise<TProduct[]>;
}
