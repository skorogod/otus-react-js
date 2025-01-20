import type { Meta } from '@storybook/react';
import { Modal } from '../shared/modal/Modal';
import React from 'react';

const meta: Meta<typeof Modal> = {
  title: 'Example/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;

export const Visible = {
  args: {
    visible: true,
    children: <p>visible modal</p>,
  },
};

export const UnVisible = {
  args: {
    visible: false,
  },
};
