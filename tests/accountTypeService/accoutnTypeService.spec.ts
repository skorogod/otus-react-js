import { AccountTypeService } from "src/api/services/accountType/accountType.service";
import { TUpdateAccoutTypeParams } from "src/api/services/accountType/interfaces";
import { localStorageMock } from "../mocks";
import { mockData } from "./mocks";

// Мокаем Axios
jest.mock("axios", () => ({
  create: jest.fn().mockImplementation(() => ({
    patch: jest.fn(),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
  })),
}));

Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
});

describe("AccountTypeService", () => {
  let accountTypeService: AccountTypeService;

  beforeEach(() => {
    accountTypeService = AccountTypeService.getInstance();
    localStorage.setItem("token", "fake-token");
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe("updateAccountTypeById", () => {
    it("update account type and return updated data", async () => {
      const params: TUpdateAccoutTypeParams = {
        id: "1",
        data: { discount: 20 },
      };

      (accountTypeService as any).axiosClient.patch.mockResolvedValueOnce({
        data: mockData,
      });

      const result = await accountTypeService.updateAccountTypeById(params);

      expect(result).toEqual(mockData);
      expect(accountTypeService.axiosClient.patch).toHaveBeenCalledWith(
        `/account-types/${params.id}`,
        params.data,
        {
          headers: {
            Authorization: "Bearer fake-token",
          },
        }
      );
    });

    it("should throw an error when the request fails", async () => {
      const params: TUpdateAccoutTypeParams = {
        id: "1",
        data: { discount: 20 },
      };
      const mockError = new Error("Request failed");

      (accountTypeService as any).axiosClient.patch.mockRejectedValueOnce(
        mockError
      );

      await expect(
        accountTypeService.updateAccountTypeById(params)
      ).rejects.toThrow(mockError);
      expect(accountTypeService.axiosClient.patch).toHaveBeenCalledWith(
        `/account-types/${params.id}`,
        params.data,
        {
          headers: {
            Authorization: "Bearer fake-token",
          },
        }
      );
    });
  });
});
