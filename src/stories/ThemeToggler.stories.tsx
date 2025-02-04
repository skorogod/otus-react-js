import type { Meta, StoryObj } from "@storybook/react";
import { ThemeToggler } from "../shared/themeToggler/ThemeToggler";
import ThemeDecorator from '../../.storybook/themeDecorator'


const meta: Meta<typeof ThemeToggler> = {
    title: 'Example/ThemeToggler',
    tags: ['autodocs'],
    component: ThemeToggler,
    decorators: [ThemeDecorator],
    parameters: {
        layout: 'centered'
    },
}

export default meta

type Story = StoryObj<typeof meta>

export const base: Story = {
}
