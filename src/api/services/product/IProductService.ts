import { TProduct } from "src/interfaces/product.interface";
import { TGetReourceParams } from "../common.interface";

export interface IProductService {
  getAll({ page, limit }: TGetReourceParams): Promise<TProduct[]>;
  getById(id: string): Promise<TProduct>;
  create(product: Omit<TProduct, "id">): Promise<TProduct>;
  update(id: string, product: Partial<TProduct>): Promise<TProduct>;
  delete(id: string): Promise<void>;
  getByCategory(category: string): Promise<TProduct[]>;
}
