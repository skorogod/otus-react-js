import {
  TAccountType,
  TAccountTypeName,
} from "src/interfaces/accountType.interface";
import { TUpdateAccoutTypeParams } from "src/api/services/accountType/interfaces";

export const mockData: TAccountType = {
  id: "1",
  name: TAccountTypeName.Standard,
  discount: 10,
};

export const accountTypesMock: TAccountType[] = [
  {
    id: "a",
    name: TAccountTypeName.Standard,
    discount: 0.1,
  },
];

export const updateAccountTypeByIdMock = async ({
  id,
  data,
}: TUpdateAccoutTypeParams) => {
  const index = accountTypesMock.findIndex((el) => el.id === id);
  if (index === -1) {
    throw new Error("accountType not found");
  } else {
    return Promise.resolve({
      ...accountTypesMock[index],
      ...data,
    });
  }
};
