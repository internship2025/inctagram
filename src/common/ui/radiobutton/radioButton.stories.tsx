import { Meta, StoryObj } from "@storybook/react";
import { RadioButton } from "./radioButton";

const meta: Meta<typeof RadioButton> = {
  title: "UI/RadioButton",
  component: RadioButton,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      defaultValue: false,
    },
    options: {
      control: "object",
      defaultValue: [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof RadioButton>;

export const Default: Story = {
  args: {
    options: [
      { value: "default", label: "Default State" },
    ],
  },
};

export const Active: Story = {
  args: {
    options: [
      { value: "active", label: "Active State" },
    ],
  },
  play: async ({ canvasElement }) => {
    const radioButton = canvasElement.querySelector('input[value="active"]') as HTMLInputElement;
    radioButton.click();
  },
  parameters: {
    pseudo: {
      active: true, // добавлено для активного состояния
    },
  },
};

export const Hover: Story = {
  args: {
    options: [
      { value: "hover", label: "Hover State" },
    ],
  },
  parameters: {
    pseudo: {
      hover: true, // добавлено для ховер-состояния
    },
  },
};

export const Focus: Story = {
  args: {
    options: [
      { value: "focus", label: "Focus State" },
    ],
  },
  play: async ({ canvasElement }) => {
    const radioButton = canvasElement.querySelector('input[value="focus"]') as HTMLInputElement;
    radioButton.focus();
  },
  parameters: {
    pseudo: {
      focus: true, // добавлено для фокусного состояния
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    options: [
      { value: "disabled", label: "Disabled State" },
    ],
  },
};
