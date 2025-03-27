import { TAccountType } from "./accountType.interface";

export type TAccount = {
  id: string;
  username: string;
  emai: string;
  accountType: TAccountType;
};
