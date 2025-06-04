import { TAccountType } from "@/interfaces/accountType.interface";

export type TUpdateAccoutTypeParams = {
  id: TAccountType["id"];
  data: Partial<Omit<TAccountType, "id">>;
};
