import {
  TProductType,
  TProductTypeName,
} from "src/interfaces/productType.interface";
import { TAccountTypeName } from "src/interfaces/accountType.interface";

export const mockData: TProductType = {
  id: "1",
  name: TProductTypeName.Car,
  discount: new Map<TAccountTypeName, number>([
    [TAccountTypeName.Free, 0.05],
    [TAccountTypeName.Standard, 0.1],
    [TAccountTypeName.Gold, 0.15],
    [TAccountTypeName.Premium, 0.2],
  ]),
};
