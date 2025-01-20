import type { Meta, StoryObj } from '@storybook/react';
import { ProductInCart } from '../shared/productInCart/ProductInCart';

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
    costFull: 200,
    title: 'Telegram accounts',
    counter: 3,
    images: ['https://avatars.mds.yandex.net/get-vthumb/3333356/915836b1bb9bbb4bc9257fa973baefd8/800x450'],
  },
};
