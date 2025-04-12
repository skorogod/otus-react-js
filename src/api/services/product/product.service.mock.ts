import { TProduct } from "src/interfaces/product.interface";
import { generateMockProducts } from "../../mocks/products.mock";
import { IProductService } from "./IProductService";
import { TGetReourceParams } from "../common.interface";
import { v4 } from "uuid";
import { Category } from "src/interfaces/category.interface";

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

  async getAll({ page, limit }: TGetReourceParams): Promise<TProduct[]> {
    return limit
      ? this.mockProducts.slice((page - 1) * limit, (page - 1) * limit + limit)
      : this.mockProducts;
  }

  async getById(id: string): Promise<TProduct> {
    const product = this.mockProducts.find((p) => p.id === id);
    if (!product) {
      throw new Error(`Товар с ID ${id} не найден`);
    }
    return product;
  }

  async create(product: Omit<TProduct, "id">): Promise<TProduct> {
    const newProduct: TProduct = {
      ...product,
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
