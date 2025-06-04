import { TProduct } from "@/interfaces/product.interface";
import { generateMockProducts } from "../../mocks/products.mock";
import { IProductService } from "./IProductService";
import { v4 } from "uuid";
import { Category } from "@/interfaces/category.interface";
import {
  TGetProductsParams,
  TGetProductsResponse,
  TNewProduct,
} from "./interfaces";
import { TProductTypeName } from "@/interfaces/productType.interface";
import { TAccountTypeName } from "@/interfaces/accountType.interface";

const mockCategory: Category = {
  id: "wdjfwdkvndmnsfbvsv",
  name: TProductTypeName.Toy,
  createdAt: new Date(),
  updatedAt: new Date(),
  commandId: "123",
  discount: {
    [TAccountTypeName.Free]: 0.5,
    [TAccountTypeName.Standard]: 0.1,
    [TAccountTypeName.Gold]: 0.15,
    [TAccountTypeName.Premium]: 0.2,
  },
};

export class ProductServiceMock implements IProductService {
  private static instance: ProductServiceMock;
  private mockProducts: TProduct[] = generateMockProducts(100);

  private constructor() {}

  public static getInstance(): ProductServiceMock {
    if (!ProductServiceMock.instance) {
      ProductServiceMock.instance = new ProductServiceMock();
    }
    return ProductServiceMock.instance;
  }

  async getAll(params: TGetProductsParams): Promise<TGetProductsResponse> {
    const data: TProduct[] = [];
    if (params.pagination?.pageSize && params.pagination?.pageNumber) {
      data.push(
        ...this.mockProducts.slice(
          (params.pagination.pageNumber - 1) * params.pagination.pageSize,
          (params.pagination.pageNumber - 1) * params.pagination.pageSize +
            params.pagination.pageSize
        )
      );
    } else {
      data.push(...this.mockProducts);
    }
    return {
      data: data,
      pagination: {
        total: 10,
        pageNumber: 1,
        pageSize: data.length,
      },
      sorting: {
        type: "ASC",
        field: "name",
      },
    };
  }

  async getById(id: string): Promise<TProduct> {
    const product = this.mockProducts.find((p) => p.id === id);
    if (!product) {
      throw new Error(`Товар с ID ${id} не найден`);
    }
    return product;
  }

  async create(product: TNewProduct): Promise<TProduct> {
    const newProduct: TProduct = {
      ...product,
      category: mockCategory,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: v4(),
    };
    this.mockProducts.push(newProduct);
    return newProduct;
  }

  async update(id: string, product: Partial<TProduct>): Promise<TProduct> {
    const index = this.mockProducts.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Товар с ID ${id} не найден`);
    }
    this.mockProducts[index] = { ...this.mockProducts[index], ...product };
    return this.mockProducts[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.mockProducts.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Товар с ID ${id} не найден`);
    }
    this.mockProducts.splice(index, 1);
  }

  async getByCategory(categoryId: Category["id"]): Promise<TProduct[]> {
    return this.mockProducts.filter((p) => p.category?.id === categoryId);
  }
}
