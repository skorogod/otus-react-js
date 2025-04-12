import { ProductTypeService } from "src/api/services/productType/productType.service";
import { localStorageMock } from "../mocks";
import { mockData } from "./mocks";
import { TUpdateProductTypeDiscount } from "src/api/services/productType/interfaces";

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
  let productTypeService: ProductTypeService;

  beforeEach(() => {
    productTypeService = ProductTypeService.getInstance();
    localStorageMock.setItem("token", "fake-token");
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe("updateProductTypeById", () => {
    it("update product type and return updated data", async () => {
      const params: TUpdateProductTypeDiscount = {
        producTypetId: "1",
        accountTypeId: "123",
        discount: 0.2,
      };

      (productTypeService as any).axiosClient.patch.mockResolvedValueOnce({
        data: mockData,
      });

      const result = await productTypeService.updateProductTypeDiscount(params);
      expect(result).toEqual(mockData);
      expect(productTypeService.axiosClient.patch).toHaveBeenCalledWith(
        `/product-types/${params.producTypetId}`,
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
      const params: TUpdateProductTypeDiscount = {
        producTypetId: "1",
        accountTypeId: "123",
        discount: 0.1,
      };

      const mockError = new Error("Request failed");

      (productTypeService as any).axiosClient.patch.mockRejectedValueOnce(
        mockError
      );

      await expect(
        productTypeService.updateProductTypeDiscount(params)
      ).rejects.toThrow(mockError);
    });
  });
});
