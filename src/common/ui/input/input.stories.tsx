import { Input } from "@/common/ui/input/input";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Input> = {
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    label: {
      control: "text",
    },
    error: {
      control: "text",
    },
    showPassword: {
      control: "boolean",
    },
    type: {
      control: {
        type: "select",
        options: [
          "text",
          "password",
          "email",
          "tel",
          "number",
          "url",
          "search",
        ],
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const DefaultInput: Story = {
  args: {
    label: "Default Input",
    placeholder: "Enter text",
  },
};

export const InputWithError: Story = {
  args: {
    label: "Input with Error",
    error: "This field is required",
    placeholder: "Enter text",
  },
};

export const PasswordInput: Story = {
  args: {
    label: "Password",
    type: "password",
    showPassword: true,
    placeholder: "Enter password",
  },
};

export const DisabledInput: Story = {
  args: {
    label: "Disabled Input",
    disabled: true,
    placeholder: "Can't type here",
  },
};
