import type { Meta, StoryObj } from "@storybook/react";
import { TransitionModalExample } from "../pages/transitionModalExample/TransitionModalExample";

const meta: Meta<typeof TransitionModalExample> = {
    title: 'Example/TransitionModal',
    component: TransitionModalExample,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered'
    }
}

export default meta;

type Story = StoryObj<typeof meta>;

export const base: Story = {}