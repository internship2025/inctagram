import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { SelectDemo } from "./select";

const meta: Meta<typeof SelectDemo> = {
  component: SelectDemo,
  tags: ["autodocs"],
  args: { onValueChange: fn() },
};

export default meta;

type Story = StoryObj<typeof SelectDemo>;

export const Primary: Story = {
  args: {
    variant: "var1",
  },
};

export const Secondary: Story = {
  args: {
    variant: "var2",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
