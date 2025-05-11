import { Meta, StoryObj } from "@storybook/react";
import { RadioButton } from "./radioButton";
import { AccountType } from "@/features/profile-settings/ui/account-menegment/hooks/useAccountType";

const meta: Meta<typeof RadioButton> = {
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
        { value: "personal" as AccountType, label: "Option 1" },
        { value: "business" as AccountType, label: "Option 2" },
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof RadioButton>;

export const Default: Story = {
  args: {
    options: [{ value: "personal" as AccountType, label: "Default State" }],
  },
};

export const Active: Story = {
  args: {
    options: [{ value: "business" as AccountType, label: "Active State" }],
  },
  play: async ({ canvasElement }) => {
    const radioButton = canvasElement.querySelector(
      'input[value="business"]',
    ) as HTMLInputElement;
    radioButton.click();
  },
  parameters: {
    pseudo: {
      active: true,
    },
  },
};

export const Hover: Story = {
  args: {
    options: [{ value: "personal" as AccountType, label: "Hover State" }],
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

export const Focus: Story = {
  args: {
    options: [{ value: "business" as AccountType, label: "Focus State" }],
  },
  play: async ({ canvasElement }) => {
    const radioButton = canvasElement.querySelector(
      'input[value="business"]',
    ) as HTMLInputElement;
    radioButton.focus();
  },
  parameters: {
    pseudo: {
      focus: true,
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    options: [{ value: "personal" as AccountType, label: "Disabled State" }],
  },
};
