import type { Meta, StoryObj } from "@storybook/react";
import { RangeSlider } from "../../src/features/rangeSlider/RangeSlider";


const meta:Meta<typeof RangeSlider> = {
    title: "Example/RangeSlider",
    component: RangeSlider,
    tags: ['autodocs'],
    parameters: {
        Layout: 'centered'
    }
};

export default meta;

export const RangeSliderExample = {
    args: {
        min: 0,
        max: 100,
        step: 1
    }
}