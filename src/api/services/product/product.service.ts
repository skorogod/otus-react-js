import { BaseService } from "../base/base.service";
import { TProduct } from "src/interfaces/product.interface";
import { TGetReourceParams } from "../common.interface";
import { TGetProductsResponse, TNewProduct } from "./interfaces";

export class ProductService extends BaseService {
  private readonly endpoint = "/products";
  private static instance: ProductService | null;

  public static getInstance() {
    return ProductService.instance || new ProductService();
  }

  async getAll({
    page,
    limit,
  }: TGetReourceParams): Promise<TGetProductsResponse> {
    const response = await this.axiosClient.get<TGetProductsResponse>(
      this.endpoint,
      {
        params: {
          pagination: JSON.stringify({ pageNumber: page, pageSize: limit }),
        },
      }
    );
    return response.data;
  }

  async getById(id: string): Promise<TProduct> {
    const response = await this.axiosClient.get<TProduct>(
      `${this.endpoint}/${id}`
    );
    return response.data;
  }

  async create(product: TNewProduct): Promise<TProduct> {
    const response = await this.axiosClient.post<TProduct>(
      this.endpoint,
      product
    );
    return response.data;
  }

  async update(id: string, product: Partial<TProduct>): Promise<TProduct> {
    const response = await this.axiosClient.put<TProduct>(
      `${this.endpoint}/${id}`,
      product
    );
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await this.axiosClient.delete(`${this.endpoint}/${id}`);
  }

  async getByCategory(category: string): Promise<TProduct[]> {
    const response = await this.axiosClient.get<TProduct[]>(
      `${this.endpoint}/category/${category}`
    );
    return response.data;
  }
}

export const productsService = ProductService.getInstance();
