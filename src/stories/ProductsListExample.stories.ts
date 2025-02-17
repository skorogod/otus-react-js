import type { Meta, StoryObj } from "@storybook/react";
import { ProductsListExample } from "../pages/page/productListExample/ProductListExample";

import '../app/App.css';

const meta: Meta<typeof ProductsListExample> = {
    title: 'Example/ProductsListExample',
    component: ProductsListExample,
    parameters: {
        Layout: 'centered'
    }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const base: Story = {}