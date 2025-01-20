import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Layout } from '../shared/layout/Layout';

const meta: Meta<typeof Layout> = {
  title: 'Example/Layout',
  component: Layout,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const base: Story = {};
