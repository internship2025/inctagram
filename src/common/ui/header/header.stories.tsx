import { Header } from "./header";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Header> = {
  title: "UI/Sidebar",
  component: Header,
  tags: ["autodocs"],
  argTypes: {

  },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

