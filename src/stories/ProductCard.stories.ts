import type { Meta } from '@storybook/react';
import { ProductCard } from '../features/products/ui/AddProductCard/ProductCard';
import telegramAccountsImage from '../assets/telegram-accounts.jpg';
import type { TProductCardProps } from 'src/interfaces/product.interface';
import { TProductTypeName } from 'src/interfaces/productType.interface';
import { TAccountTypeName } from 'src/interfaces/accountType.interface';

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
  name: 'Телеграм аккаунт',
  desc: 'лучшие телеграм аккаунты по низким ценам только у нас!',
  photo: telegramAccountsImage,
  price: 200,
  onCountChange: () => {},
  category: {
    id: 'vsjanflsurhs',
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
