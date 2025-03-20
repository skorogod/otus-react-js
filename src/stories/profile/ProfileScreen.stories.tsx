import { StoryObj, type Meta } from "@storybook/react";
import { ProfileScreen } from "../../pages/profile/profileScreen/ProfileScreen";

const meta: Meta<typeof ProfileScreen> = {
  title: "Example/Profile/ProfileScreen",
  tags: ["autodocs"],
  component: ProfileScreen,
  parameters: {
    layout: 'centered'
  }
}
export default meta;

type Story = StoryObj<typeof meta>;

export const base: Story = {};