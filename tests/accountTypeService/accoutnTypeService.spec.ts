import { AccountTypeService } from "src/services/accountType/accountType.service";
import {
  TAccountType,
  TAccountTypeName,
} from "src/interfaces/accountType.interface";
import { TUpdateAccoutTypeParams } from "src/services/accountType/interfaces";

// Мокаем Axios
jest.mock("axios", () => ({
  Axios: jest.fn().mockImplementation(() => ({
    patch: jest.fn(),
  })),
}));

// Мокаем localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

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
      const mockData: TAccountType = {
        id: "1",
        name: TAccountTypeName.Standard,
        discount: 10,
      };
      const params: TUpdateAccoutTypeParams = {
        id: "1",
        data: { discount: 20 },
      };

      (accountTypeService as any).axiosClient.patch.mockResolvedValueOnce({
        data: mockData,
      });

      const result = await accountTypeService.updateAccountTypeById(params);

      expect(result).toEqual(mockData);
      expect(
        (accountTypeService as any).axiosClient.patch
      ).toHaveBeenCalledWith(`/account-types/${params.id}`, params.data, {
        headers: {
          Authorization: "Bearer fake-token",
        },
      });
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
      expect(
        (accountTypeService as any).axiosClient.patch
      ).toHaveBeenCalledWith(`/account-types/${params.id}`, params.data, {
        headers: {
          Authorization: "Bearer fake-token",
        },
      });
    });
  });
});
