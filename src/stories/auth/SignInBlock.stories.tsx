import { StoryObj, type Meta } from "@storybook/react";
import { SignInBlock } from "../../pages/auth/signInBlock/SignInBlock";

const meta: Meta<typeof SignInBlock> = {
  title: "Example/Auth/SignInBllock",
  component: SignInBlock,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};