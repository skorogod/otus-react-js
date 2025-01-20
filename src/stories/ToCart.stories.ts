import type { Meta } from '@storybook/react';
import { ToCart } from '../shared/toCart/ToCart';

const meta: Meta<typeof ToCart> = {
  title: 'Example/ToCart',
  component: ToCart,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const NullCounter = {
  args: {
    counter: 0,
  },
};

export const NotNullCounter = {
  args: {
    counter: 1,
  },
};
