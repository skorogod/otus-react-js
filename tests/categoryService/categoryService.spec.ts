import { CategoryService } from "src/api/services/category/category.service";
import { localStorageMock } from "../mocks";
import { mockData } from "./mocks";
import { TUpdateCategoryDiscount } from "src/api/services/category/interfaces";

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

describe("ProductTypeService", () => {
  let productTypeService: CategoryService;

  beforeEach(() => {
    productTypeService = CategoryService.getInstance();
    localStorageMock.setItem("token", "fake-token");
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe("updateProductTypeById", () => {
    it("update product type and return updated data", async () => {
      const params: TUpdateCategoryDiscount = {
        categoryId: "1",
        accountTypeId: "123",
        discount: 0.2,
      };

      (productTypeService as any).axiosClient.patch.mockResolvedValueOnce({
        data: mockData,
      });

      const result = await productTypeService.updateCategoryDiscount(params);
      expect(result).toEqual(mockData);
      expect(productTypeService.axiosClient.patch).toHaveBeenCalledWith(
        `/categories/${params.categoryId}`,
        {
          accountTypeId: params.accountTypeId,
          discount: params.discount,
        },
        {
          headers: {
            Authorization: "Bearer fake-token",
          },
        }
      );
    });

    it("shoud throw an error when request fails", async () => {
      const params: TUpdateCategoryDiscount = {
        categoryId: "1",
        accountTypeId: "123",
        discount: 0.1,
      };

      const mockError = new Error("Request failed");

      (productTypeService as any).axiosClient.patch.mockRejectedValueOnce(
        mockError
      );

      await expect(
        productTypeService.updateCategoryDiscount(params)
      ).rejects.toThrow(mockError);
    });
  });
});
