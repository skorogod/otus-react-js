import { AddProductForm } from "../../features/products/ui/AddProductForm/AddProductForm";
import { type Meta } from "@storybook/react";
import { type StoryObj } from "@storybook/react";

const meta: Meta<typeof AddProductForm> = {
  title: "Example/Product/AddProductForm",
  component: AddProductForm,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {}