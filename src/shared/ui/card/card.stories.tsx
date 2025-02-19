import { Card } from "@/shared/ui/card/card";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Card> = {
  title: "Common/ui/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {};
