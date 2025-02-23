import type { Meta, StoryObj } from "@storybook/react";
import { ResizerExample } from "../../src/pages/resizerExample/ResizerExample";

const meta: Meta<typeof ResizerExample> = {
    title: 'Example/ResizerExample',
    tags: ['autodocs'],
    component: ResizerExample,
    parameters: {
        layoyt: 'center'
    }
}

export default meta;

type Story = StoryObj<typeof meta>

export const base: Story = {
    args: {
        initialHeight: 100,
        initialWidth: 300
    }
}