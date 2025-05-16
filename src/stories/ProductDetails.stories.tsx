import type { Meta, StoryObj } from '@storybook/react';
import { ProductDetails } from '../shared/product/productDetails/ProductDetails';
import { TAccountTypeName } from 'src/interfaces/accountType.interface';

const meta: Meta<typeof ProductDetails> = {
  title: 'Example/ProductDetails',
  tags: ['autodocs'],
  component: ProductDetails,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const base: Story = {
  args: {
    desc: `
            ⭐Без СПАМБЛОКА!\n
            ⭐Для любых целей\n
            ⭐PREMIUM - качество.\n
            ⭐Владелец - только вы! Ставите двухфакторку и привязываете почту.\n\n

            ✔ Отвечаю быстро.\n
            ✔ Моментальная выдача товара.\n\n

            ❓ Как будет происходить сделка?\n

            1️⃣ Вы оплачиваете товар.\n
            2️⃣ Я присылаю вам номер, вы заходите и просите код.\n
            3️⃣ Далее вы меняете данные и вы ставите Облачный пароль (2FA).`,

    price: 200,
    inStock: 700,
    oldPrice: 300,
    name: 'Telegram accounts',
    photo: 'https://avatars.mds.yandex.net/get-vthumb/3333356/915836b1bb9bbb4bc9257fa973baefd8/800x450',
    photos: [
      'https://avatars.mds.yandex.net/get-vthumb/3333356/915836b1bb9bbb4bc9257fa973baefd8/800x450',
      'https://i.ytimg.com/vi/ht1IDr80VEw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBIiNHir1hgLfxO_2g7g0zCB_OFqg',
      'https://avatars.mds.yandex.net/get-vthumb/3333356/915836b1bb9bbb4bc9257fa973baefd8/800x450',
      'https://i.ytimg.com/vi/ht1IDr80VEw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBIiNHir1hgLfxO_2g7g0zCB_OFqg',
      'https://avatars.mds.yandex.net/get-vthumb/3333356/915836b1bb9bbb4bc9257fa973baefd8/800x450',
      'https://i.ytimg.com/vi/ht1IDr80VEw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBIiNHir1hgLfxO_2g7g0zCB_OFqg',
    ],
    category: { 
      id: '1', 
      name: 'Аккаунты',
      createdAt: new Date(),
      updatedAt: new Date(),
      commandId: '1',
      discount: {
        [TAccountTypeName.Free]: 0,
        [TAccountTypeName.Standard]: 0,
        [TAccountTypeName.Premium]: 0,
        [TAccountTypeName.Gold]: 0,
      }
    },
  },
};
