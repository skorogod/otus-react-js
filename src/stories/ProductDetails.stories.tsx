import type { Meta, StoryObj } from '@storybook/react';
import { ProductDetails } from '../shared/product/productDetails/ProductDetails';

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
    description: `
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

    costFull: 200,
    inStock: 700,
    costDiscount: 300,
    title: 'Telegram accounts',
    images: [
      'https://avatars.mds.yandex.net/get-vthumb/3333356/915836b1bb9bbb4bc9257fa973baefd8/800x450',
      'https://i.ytimg.com/vi/ht1IDr80VEw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBIiNHir1hgLfxO_2g7g0zCB_OFqg',
      'https://avatars.mds.yandex.net/get-vthumb/3333356/915836b1bb9bbb4bc9257fa973baefd8/800x450',
      'https://i.ytimg.com/vi/ht1IDr80VEw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBIiNHir1hgLfxO_2g7g0zCB_OFqg',
      'https://avatars.mds.yandex.net/get-vthumb/3333356/915836b1bb9bbb4bc9257fa973baefd8/800x450',
      'https://i.ytimg.com/vi/ht1IDr80VEw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBIiNHir1hgLfxO_2g7g0zCB_OFqg',
    ],
    category: { name: 'Аккаунты' },
  },
};
