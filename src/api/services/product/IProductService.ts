import { TProduct } from "src/interfaces/product.interface";
import {
  TGetProductsParams,
  TGetProductsResponse,
  TNewProduct,
  TUpdateProductData,
} from "./interfaces";

export interface IProductService {
  getAll(params: TGetProductsParams): Promise<TGetProductsResponse>;
  getById(id: string): Promise<TProduct>;
  create(product: TNewProduct): Promise<TProduct>;
  update(id: string, data: TUpdateProductData): Promise<TProduct>;
  delete(id: string): Promise<void>;
  getByCategory(category: string): Promise<TProduct[]>;
}
