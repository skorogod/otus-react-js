import { BaseService } from "../base/base.service";
import { TGetReourceParams } from "../common.interface";
import {
  TAddCategory,
  TGetCategoriesReponse,
  TUpdateCategoryDiscount,
  TUpdateCategoryParams,
} from "./interfaces";
import { Category } from "src/interfaces/category.interface";

export class CategoryService extends BaseService {
  private static instance: CategoryService | null;
  constructor() {
    super();
    CategoryService.instance = this;
  }

  static getInstance() {
    return CategoryService.instance || new CategoryService();
  }

  async getAll({
    page,
    limit,
  }: TGetReourceParams): Promise<TGetCategoriesReponse> {
    try {
      const response = await this.axiosClient.get("/categories", {
        params: {
          pagination: JSON.stringify({ pageSize: limit, pageNumber: page }),
        },
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async create(data: TAddCategory): Promise<Category> {
    const response = await this.axiosClient.post("/categories", data);
    return response.data;
  }

  async updateCategory({ id, data }: TUpdateCategoryParams): Promise<Category> {
    try {
      const response = await this.axiosClient.patch(`/categories/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateCategoryDiscount({
    categoryId,
    accountTypeId,
    discount,
  }: TUpdateCategoryDiscount): Promise<Category> {
    try {
      const response = await this.axiosClient.patch(
        `/categories/${categoryId}`,
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

export const categoryService = CategoryService.getInstance();
