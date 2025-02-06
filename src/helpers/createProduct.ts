import { v4 as uuidv4 } from 'uuid'
import { TProduct } from 'src/interfaces/product.interface';


export const createRandomProduct: (createdAt: string) => TProduct = (createdAt) => {
    const description = str_random(20)
      .split('')
      .map((letter, index) => (index % 5 === 0 ? ` ${letter}` : letter))
      .join('');
  
    return {
      id: uuidv4(),
      title: str_random(6),
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLRPoPXeZp33NUTBeCnn3vBj_NnkZB_76hbg&s"],
      desc: description,
      createdAt,
      costFull: Math.round(Math.random() * 100),
      costDiscount: Math.round(Math.random() * 100),
      category: {
        id: uuidv4(),
        name: str_random(6),
        photo: str_random(10),
      },
    };
  };

//  Функция для генерации рандомной строки
function str_random(length: number) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      const randomInd = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomInd);
    }
    return result;
  }