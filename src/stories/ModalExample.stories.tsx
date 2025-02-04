import type { Meta, StoryObj } from "@storybook/react";
import { ModalExample } from "../pages/modalExample/ModalExample";


const meta: Meta<typeof ModalExample> = {
    title: 'Example/ModalExample',
    component: ModalExample,
    tags: ['autodocs'],
    parameters: {
        layout: 'center'
    }
}

export default meta;

type Story = StoryObj<typeof meta>;

export const base: Story = {}