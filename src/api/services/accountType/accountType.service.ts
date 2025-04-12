import { TAccountType } from "src/interfaces/accountType.interface";
import { BaseService } from "../base/base.service";
import { TUpdateAccoutTypeParams } from "./interfaces";

export class AccountTypeService extends BaseService {
  private static instance: AccountTypeService | null;
  constructor() {
    super();
    AccountTypeService.instance = this;
  }

  static getInstance() {
    return AccountTypeService.instance || new AccountTypeService();
  }

  async updateAccountTypeById({
    id,
    data,
  }: TUpdateAccoutTypeParams): Promise<TAccountType> {
    try {
      const response = await this.axiosClient.patch(
        `/account-types/${id}`,
        data,
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

export const accountTypeService = AccountTypeService.getInstance();
