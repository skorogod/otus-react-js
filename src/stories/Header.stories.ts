import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '../shared/header/Header';
import ThemeDecorator from '../../.storybook/themeDecorator';
import LangDecorator from '../../.storybook/langDecorator';
import '../i18n'

const meta: Meta<typeof Header> = {
  title: 'Example/Header',
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  decorators: [ThemeDecorator, LangDecorator],
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};

export const LoggedOut: Story = {};
