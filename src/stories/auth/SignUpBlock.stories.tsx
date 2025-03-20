import { StoryObj, type Meta } from "@storybook/react";
import { SignUpBlock } from "../../pages/auth/signUpBlock/SignUpBlock";

const meta: Meta<typeof SignUpBlock> = {
  title: "Example/Auth/SignUpBllock",
  component: SignUpBlock,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};