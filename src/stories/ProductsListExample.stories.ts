import type { Meta, StoryObj } from "@storybook/react";
import { ProductsScreen } from "../pages/products/productsScreen/ProductsScreen";

import '../app/App.css';

const meta: Meta<typeof ProductsScreen> = {
    title: 'Example/ProductsListExample',
    component: ProductsScreen,
    parameters: {
        Layout: 'centered'
    }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const base: Story = {}