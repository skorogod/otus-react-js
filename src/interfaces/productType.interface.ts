import { TAccountTypeName } from "./accountType.interface";

export enum TProductTypeName {
  Car = "Car",
  Toy = "Toy",
  Food = "Food",
  TelegramAccount = "TelegramAccount",
}

export type TProductType = {
  id: string;
  name: TProductTypeName;
  discount: Record<TAccountTypeName, number>;
};
