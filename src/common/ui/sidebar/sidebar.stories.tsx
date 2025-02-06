import { Sidebar } from "./sidebar";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Sidebar> = {
  title: "UI/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  argTypes: {

  },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

