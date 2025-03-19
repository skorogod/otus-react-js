import { TAccountTypeName } from "./accountType.interface";

export enum TProductTypeName {
  Car = "Car",
  Toy = "Toy",
  Food = "Food",
}

export type TProductType = {
  id: string;
  name: TProductTypeName;
  discount: Map<TAccountTypeName, number>;
};
