import { calculateDiscount } from "src/helpers/calculateDiscount";
import { TAccountTypeName } from "src/interfaces/accountType.interface";

import { mockAccountType, mockProduct, mockProductType } from "./mocks";

describe("Calculate discount", () => {
  test("calculate discount is a function", () => {
    expect(calculateDiscount).toBeInstanceOf(Function);
  });

  test("200 is discount for 800", () => {
    expect(
      calculateDiscount({ accountType: mockAccountType, product: mockProduct })
    ).toBe(200);
  });

  test("max discount is 99%", () => {
    expect(
      calculateDiscount({
        accountType: { ...mockAccountType, discount: 0.75 },
        product: {
          ...mockProduct,
          type: {
            ...mockProductType,
            discount: new Map([[TAccountTypeName.Standard, 0.5]]),
          },
        },
      })
    ).toBe(792);
  });
});
