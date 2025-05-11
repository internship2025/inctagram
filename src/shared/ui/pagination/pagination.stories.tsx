import { Pagination } from "./pagination";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  parameters: {
    tags: ["autodocs"],
  },
  args: { 
    onPageChange: fn(),
    onItemsPerPageChange: fn(),
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 100
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalItems: 10,
  },
};
