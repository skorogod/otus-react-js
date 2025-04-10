import { TProduct } from "src/interfaces/product.interface";
import { TProductTypeName } from "src/interfaces/productType.interface";

export const generateMockProducts = (count: number): TProduct[] =>
  Array.from({ length: count }, (_, index) => ({
    id: (index + 1).toString(),
    title: `Товар ${index + 1}`,
    description: `Описание товара ${index + 1}`,
    costFull: Math.floor(Math.random() * 1000) + 100,
    costDiscount: Math.floor(Math.random() * 800) + 50,
    category: {
      id: (index + 1).toString(),
      name: ["Электроника", "Одежда", "Книги", "Спорт"][
        Math.floor(Math.random() * 4)
      ],
    },
    images: [
      `https://picsum.photos/200/200?random=${index}`,
      `https://picsum.photos/200/200?random=${index + 1}`,
    ],
    type: {
      id: (index + 1).toString(),
      name: TProductTypeName.Car,
      discount: {
        Standard: 0,
        Premium: 0,
        Gold: 0,
        Free: 0,
      },
    },
  }));
