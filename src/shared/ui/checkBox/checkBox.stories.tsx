import { CheckBox } from "./checkBox";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CheckBox> = {
  component: CheckBox,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "disable"],
    },
    txt: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof CheckBox>;

export const WithText: Story = {
  args: {
    variant: "default",
    txt: "Check me",
  },
};

export const WithoutText: Story = {
  args: {
    variant: "default",
  },
};

export const DisableWithText: Story = {
  args: {
    variant: "disable",
    txt: "Check me",
    disabled: true,
  },
};

export const DisableWithoutText: Story = {
  args: {
    variant: "disable",
    disabled: true,
  },
};
