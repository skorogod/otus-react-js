import { v4 as uuidv4 } from "uuid";
import { TProduct } from "src/interfaces/product.interface";
import { TAccountTypeName } from "src/interfaces/accountType.interface";

//  Функция для генерации рандомной строки
function str_random(length: number) {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    const randomInd = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomInd);
  }
  return result;
}

export const createRandomProduct: () => TProduct = () => {
  const desc = str_random(20)
    .split("")
    .map((letter, index) => (index % 5 === 0 ? ` ${letter}` : letter))
    .join("");

  return {
    id: uuidv4(),
    name: str_random(6),
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLRPoPXeZp33NUTBeCnn3vBj_NnkZB_76hbg&s",
    photos: [],
    desc,
    createdAt: new Date(),
    updatedAt: new Date(),
    price: Math.round(Math.random() * 100),
    oldPrice: Math.round(Math.random() * 100),
    commandId: uuidv4(),
    category: {
      id: uuidv4(),
      name: str_random(6),
      photo: str_random(10),
      createdAt: new Date(),
      updatedAt: new Date(),
      commandId: uuidv4(),
      discount: {
        [TAccountTypeName.Free]: 0,
        [TAccountTypeName.Standard]: 0,
        [TAccountTypeName.Premium]: 0,
        [TAccountTypeName.Gold]: 0,
      },
    },
  };
};
