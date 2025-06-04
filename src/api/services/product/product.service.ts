import { BaseService } from "../base/base.service";
import { TProduct } from "../../../interfaces/product.interface";
import {
  TGetProductsParams,
  TGetProductsResponse,
  TNewProduct,
  TUpdateProductData,
} from "./interfaces";

export class ProductService extends BaseService {
  private readonly endpoint = "/products";
  private static instance: ProductService | null;

  public static getInstance() {
    return ProductService.instance || new ProductService();
  }

  async getAll(params: TGetProductsParams): Promise<TGetProductsResponse> {
    const response = await this.axiosClient.get<TGetProductsResponse>(
      this.endpoint,
      {
        params: {
          ...params,
          name: JSON.stringify(params.name),
          pagination: JSON.stringify(params.pagination),
          createdAt: JSON.stringify(params.createdAt),
          categoryIds: JSON.stringify(params.categoryIds),
          updatedAt: JSON.stringify(params.updatedAt),
          sorting: JSON.stringify(params.sorting),
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

  async update(id: string, data: TUpdateProductData): Promise<TProduct> {
    const response = await this.axiosClient.put<TProduct>(
      `${this.endpoint}/${id}`,
      data
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
