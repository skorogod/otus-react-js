import { TAccount } from "src/interfaces/account.interface";
import { mockData as accountTypeMock } from "../accountTypeService/mocks";

export const mockData: TAccount = {
  id: "1",
  username: "user1",
  emai: "user1@mail.ru",
  accountType: accountTypeMock,
};
