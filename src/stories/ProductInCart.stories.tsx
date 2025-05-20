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
      name: 'Telegram accounts',
      price: 200,
      photo: 'https://avatars.mds.yandex.net/get-vthumb/3333356/915836b1bb9bbb4bc9257fa973baefd8/800x450',
      photos: [],
      desc: 'Описание товара',
      createdAt: new Date(),
      updatedAt: new Date(),
      commandId: '1',
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
      }
    },
    counter: 3,
  },
};
