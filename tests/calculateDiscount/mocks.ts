import { TProduct } from "src/interfaces/product.interface";
import {
  TAccountType,
  TAccountTypeName,
} from "src/interfaces/accountType.interface";
import {
  TProductType,
  TProductTypeName,
} from "src/interfaces/productType.interface";

export const mockProductType: TProductType = {
  id: "wdjfwdkvndmnsfbvsv",
  name: TProductTypeName.Toy,
  discount: new Map([
    [TAccountTypeName.Free, 0.5],
    [TAccountTypeName.Standard, 0.1],
    [TAccountTypeName.Gold, 0.15],
    [TAccountTypeName.Premium, 0.2],
  ]),
};

export const mockAccountType: TAccountType = {
  id: "[f2kfwmfpnfwdmwkgnwdf",
  name: TAccountTypeName.Standard,
  discount: 0.15,
};

export const mockProduct: TProduct = {
  id: "dksdmlfnds,nsfd",
  title: "Мишка",
  costFull: 800,
  images: [],
  type: mockProductType,
};
