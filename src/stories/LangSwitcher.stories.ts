import type { Meta, StoryObj } from "@storybook/react";
import { LanguageSwitcher } from "../shared/languageSwitcher/laguageSwitcher";
import LangDecorator from '../../.storybook/langDecorator'

const meta: Meta<typeof LanguageSwitcher> = {
    title: 'Example/LanguageSwitcher',
    component: LanguageSwitcher,
    tags: ['autodocs'],
    decorators: [LangDecorator]
}

export default meta

type Story = StoryObj<typeof meta>

export const base: Story = {}