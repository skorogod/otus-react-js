import type { Meta } from '@storybook/react';

import { Logo } from '../shared/logo/Logo';

const meta: Meta<typeof Logo> = {
  title: 'Example/Logo',
  component: Logo,
  tags: ['autodocs'],
};

export default meta;

export const Small = {
  args: {
    size: 'small',
  },
};

export const Medium = {
  args: {
    size: 'medium',
  },
};

export const Large = {
  args: {
    size: 'large',
  },
};
