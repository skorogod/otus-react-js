import type { TAccount } from "@/interfaces/account.interface";

export type TGetAccountsResponse = TAccount[];

export type TGetAccountByIdResponse = TAccount;

export type TGetAccountByIdParams = {
  id: TAccount["id"];
};
