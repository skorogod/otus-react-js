import { BaseService } from "../baseService/base.service";
import { TGetAccountResponse } from "./interfaces";

export class AccountService extends BaseService {
  private static instance: BaseService | null;

  constructor() {
    super();
    AccountService.instance = this;
  }

  static getInstance() {
    return AccountService.instance || new AccountService();
  }

  async getAccount(): Promise<TGetAccountResponse> {
    try {
      const response = await this.axiosClient.get("/accounts", {
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

export const accountService = AccountService.getInstance();
