import { AccountService } from "src/api/services/account/account.service";
import { localStorageMock } from "../mocks";
import { mockData } from "./mocks";

jest.mock("axios", () => ({
  create: jest.fn().mockImplementation(() => ({
    get: jest.fn(),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
  })),
}));

Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
});

describe("AccountService", () => {
  let accountService: AccountService;

  beforeEach(() => {
    accountService = new AccountService();
    localStorageMock.setItem("token", "fake-token");
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });

  describe("getAccountById", () => {
    it("get account by id and return data", async () => {
      (accountService as any).axiosClient.get.mockResolvedValueOnce({
        data: mockData,
      });

      const resp = await accountService.getAccountById({ id: "1" });
      expect(resp).toEqual(mockData);
      expect(accountService.axiosClient.get).toHaveBeenCalledWith(
        "/accounts/1",
        {
          headers: {
            Authorization: "Bearer fake-token",
          },
        }
      );
    });
  });
});
