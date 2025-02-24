import { Meta, StoryObj } from "@storybook/react";
import TabsComponent from "./tabs";

const meta: Meta<typeof TabsComponent> = {
  component: TabsComponent,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["primary", "secondary"],
      defaultValue: "primary",
    },
  },
};

export default meta;

type Story = StoryObj<typeof TabsComponent>;

export const Default: Story = {
  args: {
    variant: "primary",
    tabs: [
      { value: "default1", trigger: "Tab 1", content: "Default Content 1" },
      { value: "default2", trigger: "Tab 2", content: "Default Content 2" },
    ],
  },
};

export const Active: Story = {
  args: {
    variant: "primary",
    tabs: [
      { value: "tab1", trigger: "Active Tab 1", content: "Content 1" },
      { value: "tab2", trigger: "Active Tab 2", content: "Content 2" },
    ],
  },
  parameters: {
    pseudo: { active: true },
  },
};

export const Hover: Story = {
  args: {
    variant: "primary",
    tabs: [
      { value: "hover1", trigger: "Hover Tab 1", content: "Content 1" },
      { value: "hover2", trigger: "Hover Tab 2", content: "Content 2" },
    ],
  },
  parameters: {
    pseudo: { hover: true },
  },
};

export const Focus: Story = {
  args: {
    variant: "primary",
    tabs: [
      { value: "focus1", trigger: "Focus Tab 1", content: "Content 1" },
      { value: "focus2", trigger: "Focus Tab 2", content: "Content 2" },
    ],
  },
  parameters: {
    pseudo: { focus: true },
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    tabs: [
      {
        value: "disabled1",
        trigger: "Disabled Tab 1",
        content: "Content 1",
        disabled: true,
      },
      {
        value: "disabled2",
        trigger: "Disabled Tab 2",
        content: "Content 2",
        disabled: true,
      },
    ],
  },
};
