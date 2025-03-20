import { TProductType } from "src/interfaces/productType.interface";
import { BaseService } from "../base/base.service";
import {
  TUpdateProductTypeDiscount,
  TUpdateProductTypeParams,
} from "./interfaces";

export class ProductTypeService extends BaseService {
  private static instance: ProductTypeService | null;
  constructor() {
    super();
    ProductTypeService.instance = this;
  }

  static getInstance() {
    return ProductTypeService.instance || new ProductTypeService();
  }

  async getProductTypes(): Promise<TProductType[]> {
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

  async updateProductType({
    id,
    data,
  }: TUpdateProductTypeParams): Promise<TProductType> {
    try {
      const response = await this.axiosClient.patch(
        `/product-types/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateProductTypeDiscount({
    producTypetId,
    accountTypeId,
    discount,
  }: TUpdateProductTypeDiscount): Promise<TProductType> {
    try {
      const response = await this.axiosClient.patch(
        `/product-types/${producTypetId}`,
        { accountTypeId, discount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const productTypeService = ProductTypeService.getInstance();
