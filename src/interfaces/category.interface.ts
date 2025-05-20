import { TAccountTypeName } from "./accountType.interface";

export type Category = {
  id: string;
  name: string;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
  commandId: string;
  discount: Record<TAccountTypeName, number>;
};
