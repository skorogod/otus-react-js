import { TProduct } from "src/interfaces/product.interface";
import {
  TAccountType,
  TAccountTypeName,
} from "src/interfaces/accountType.interface";
import { TProductTypeName } from "src/interfaces/productType.interface";
import { Category } from "src/interfaces/category.interface";

export const mockCategory: Category = {
  id: "wdjfwdkvndmnsfbvsv",
  name: TProductTypeName.Toy,
  createdAt: new Date(),
  updatedAt: new Date(),
  commandId: "123",
  discount: {
    [TAccountTypeName.Free]: 0.5,
    [TAccountTypeName.Standard]: 0.1,
    [TAccountTypeName.Gold]: 0.15,
    [TAccountTypeName.Premium]: 0.2,
  },
};

export const mockAccountType: TAccountType = {
  id: "f2kfwmfpnfwdmwkgnwdf",
  name: TAccountTypeName.Standard,
  discount: 0.15,
};

export const mockProduct: TProduct = {
  id: "dksdmlfnds,nsfd",
  name: "Мишка",
  oldPrice: 800,
  price: 600,
  createdAt: new Date(),
  updatedAt: new Date(),
  commandId: "123",
  category: mockCategory,
  photo: "",
};
