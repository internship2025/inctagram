import { TextArea } from "@/shared/ui/textArea/textArea";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TextArea> = {
  component: TextArea,
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
  },
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    label: "Text-area",
  },
};

export const textAreaWithError: Story = {
  args: {
    label: "Text-area",
    error: "Error text",
  },
};
