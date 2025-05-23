import { TProduct } from "src/interfaces/product.interface";
import { generateMockProducts } from "../../mocks/products.mock";
import { IProductService } from "./IProductService";
import { TGetReourceParams } from "../common.interface";
import { v4 } from "uuid";
import { Category } from "src/interfaces/category.interface";
import { TGetProductsResponse, TNewProduct } from "./interfaces";
import { TProductTypeName } from "src/interfaces/productType.interface";
import { TAccountTypeName } from "src/interfaces/accountType.interface";

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

  async getAll({
    page,
    limit,
  }: TGetReourceParams): Promise<TGetProductsResponse> {
    const data: TProduct[] = [];
    if (limit) {
      data.push(
        ...this.mockProducts.slice(
          (page - 1) * limit,
          (page - 1) * limit + limit
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
