import { Meta, StoryObj } from "@storybook/react";
import { SuperSelect } from "./SuperSelect";

const meta = {
  title: "Common/ui/SuperSelect",
  component: SuperSelect,
  parameters: {
    tags: ["autodocs"],
  },
} satisfies Meta<typeof SuperSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithDifferentValue: Story = {
  args: {},
};
