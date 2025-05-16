import { TAccountType } from "./accountType.interface";

export type TAccount = {
  id: string;
  username: string;
  email: string;
  accountType: TAccountType;
};
