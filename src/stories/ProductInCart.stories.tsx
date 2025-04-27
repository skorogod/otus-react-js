import type { Meta, StoryObj } from '@storybook/react';
import { ProductInCart } from '../shared/productInCart/ProductInCart';
import {v4 as uuidv4} from "uuid";
import { TProductTypeName } from 'src/interfaces/productType.interface';
import { TAccountTypeName } from 'src/interfaces/accountType.interface';

import '../app/App.css';

const meta: Meta<typeof ProductInCart> = {
  title: 'Example/ProductInCart',
  tags: ['autodocs'],
  component: ProductInCart,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const base: Story = {
  args: {
    product: {
      id: "1",
      title: 'Telegram accounts',
      costFull: 200,
      images: ['https://avatars.mds.yandex.net/get-vthumb/3333356/915836b1bb9bbb4bc9257fa973baefd8/800x450'],
      type: {
        id: uuidv4(),
        name: TProductTypeName.TelegramAccount,
        discount: {
          [TAccountTypeName.Free]: Math.random() * 100,
          [TAccountTypeName.Premium]: Math.random() * 100,
          [TAccountTypeName.Gold]: Math.random() * 100,
          [TAccountTypeName.Standard]: Math.random() * 100,
        },
      },
    },
    counter: 3,
  },
};
