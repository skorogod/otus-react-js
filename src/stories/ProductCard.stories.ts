import type { Meta } from '@storybook/react';
import { ProductCard } from '../shared/product/productCard/ProductCard';
import telegramAccountsImage from '../assets/telegram-accounts.jpg';
import type { TProductCardProps } from 'src/interfaces/product.interface';

const meta: Meta<typeof ProductCard> = {
  title: 'Example/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    backgroundColor: { control: 'color' },
    color: { control: 'color' },
  },
};

export default meta;

const productCardProps: Omit<TProductCardProps, 'count'> = {
  id: 'vsjanflsurhs',
  title: 'Телеграм аккаунт',
  description: 'лучшие телеграм аккаунты по низким ценам только у нас!',
  image: telegramAccountsImage,
  costFull: 200,
};

export const WithNotNullCount = {
  args: {
    ...productCardProps,
    count: 10,
  },
};

export const WithNullCount = {
  args: {
    ...productCardProps,
    count: 0,
  },
};
