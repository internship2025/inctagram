import { SuperPagination } from "./SuperPagination";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const meta: Meta<typeof SuperPagination> = {
  component: SuperPagination,
  parameters: {
    tags: ["autodocs"],
  },
  args: { onValueChange: fn() },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};
