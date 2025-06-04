import { TAccount } from "../../../interfaces/account.interface";
import { BaseService } from "../base/base.service";
import { TGetAccountByIdParams, TGetAccountsResponse } from "./interfaces";

export class AccountService extends BaseService {
  private static instance: BaseService | null;

  constructor() {
    super();
    AccountService.instance = this;
  }

  static getInstance() {
    return AccountService.instance || new AccountService();
  }

  async getAccounts(): Promise<TGetAccountsResponse> {
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

  async getAccountById({ id }: TGetAccountByIdParams): Promise<TAccount> {
    try {
      const response = await this.axiosClient.get(`/accounts/${id}`, {
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
