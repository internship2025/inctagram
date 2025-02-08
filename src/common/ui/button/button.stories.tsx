import { Button } from "./button";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "outline", "text", "secondary"],
    },
    disabled: {
      control: "boolean",
    },
    children: {
      control: "text",
      defaultValue: "Click me",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    children: "Text Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
    disabled: true,
  },
};
