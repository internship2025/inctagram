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
    onChange: {
      action: "checked",
    },
  },
};

export default meta;

type Story = StoryObj<typeof CheckBox>;

export const WithText: Story = {
  args: {
    variant: "default",
    txt: "Check me",
    onChange: (checked) => console.log(checked), // Заглушка
  },
};

export const WithoutText: Story = {
  args: {
    variant: "default",
    onChange: (checked) => console.log(checked),
  },
};

export const DisableWithText: Story = {
  args: {
    variant: "disable",
    txt: "Check me",
    disabled: true,
    onChange: (checked) => console.log(checked),
  },
};

export const DisableWithoutText: Story = {
  args: {
    variant: "disable",
    disabled: true,
    onChange: (checked) => console.log(checked),
  },
};
