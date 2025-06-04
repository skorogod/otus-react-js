import { Order } from "../../../interfaces/order.interface";
import { BaseService } from "../base/base.service";
import {
  TAddOrderParams,
  TGetOrdersParams,
  TGetOrdersResponse,
  TUpdateOrderParams,
} from "./interfaces";
import { OrderStatus } from "../../../features/orders/state/interface";

export class OrderService extends BaseService {
  private static instance: OrderService | null;
  constructor() {
    super();
    OrderService.instance = this;
  }

  static getInstance() {
    return OrderService.instance || new OrderService();
  }

  async getAll(params: TGetOrdersParams): Promise<TGetOrdersResponse> {
    try {
      const response = await this.axiosClient.get("/orders", {
        params: {
          ...params,
          pagination: JSON.stringify(params.pagination),
          createdAt: JSON.stringify(params.createdAt),
          updatedAt: JSON.stringify(params.updatedAt),
          sorting: JSON.stringify(params.sorting),
          status: JSON.stringify(params.status),
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

  async create(data: TAddOrderParams): Promise<Order> {
    const response = await this.axiosClient.post("/orders", data);
    return response.data;
  }

  async updateOrder({ id, data }: TUpdateOrderParams): Promise<Order> {
    try {
      const response = await this.axiosClient.patch(`/orders/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateStatus(orderId: string, status: OrderStatus): Promise<Order> {
    try {
      const response = await this.axiosClient.patch(
        `/orders/${orderId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const orderService = OrderService.getInstance();
