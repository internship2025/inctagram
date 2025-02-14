import { Meta, StoryObj } from "@storybook/react";

import { fn } from "@storybook/test";
import { SelectDemo } from "./Select";

const meta: Meta<typeof SelectDemo> = {
  title: "Example/Components/select",
  component: SelectDemo,
  args: { onValueChange: fn() },
};

export default meta;

type Story = StoryObj<typeof meta>;

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
