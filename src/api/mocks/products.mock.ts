import { TProduct } from "@/interfaces/product.interface";
import { TAccountTypeName } from "@/interfaces/accountType.interface";

export const generateMockProducts = (count: number): TProduct[] =>
  Array.from({ length: count }, (_, index) => ({
    id: (index + 1).toString(),
    name: `Товар ${index + 1}`,
    description: `Описание товара ${index + 1}`,
    price: Math.floor(Math.random() * 1000) + 100,
    oldPrice: Math.floor(Math.random() * 800) + 50,
    category: {
      id: (index + 1).toString(),
      name: ["Электроника", "Одежда", "Книги", "Спорт"][
        Math.floor(Math.random() * 4)
      ],
      photo: `https://loremflickr.com/200/200?random=${index}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      commandId: (index + 1).toString(),
      discount: {
        [TAccountTypeName.Free]: 0,
        [TAccountTypeName.Standard]: 0,
        [TAccountTypeName.Premium]: 0,
        [TAccountTypeName.Gold]: 0,
      },
    },
    photo: `https://loremflickr.com/200/200?random=${index}`,
    photos: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    commandId: (index + 1).toString(),
  }));
