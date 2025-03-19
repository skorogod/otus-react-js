import { BaseService } from "../baseService/base.service";

export class ProductTypeService extends BaseService {
  private static instance: ProductTypeService | null;
  constructor() {
    super();
    ProductTypeService.instance = this;
  }

  static getInstance() {
    return ProductTypeService.instance || new ProductTypeService();
  }

  async getProductTypes() {
    try {
      const response = await this.axiosClient.get("/product-types", {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const productTypeService = ProductTypeService.getInstance();
