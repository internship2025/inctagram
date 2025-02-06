import { Header } from "./header";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Header> = {
  title: "UI/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    currentLang: {
      options: ['English', 'Русский'],
      control: { type: 'radio' }
    },
    onLangChange: {
      action: 'language changed'
    },
    showAuth: {
      control: 'boolean',
      description: 'Show authentication buttons'
    },
    onLoginClick: {
      action: 'login clicked'
    },
    onSignUpClick: {
      action: 'sign up clicked'
    }
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const English: Story = {
  args: {
    currentLang: 'English',
  },
};

export const Russian: Story = {
  args: {
    currentLang: 'Русский',
  },
};

export const WithCallback: Story = {
  args: {
    currentLang: 'English',
    onLangChange: (lang: string) => alert(`Language changed to: ${lang}`)
  },
};

export const Mobile: Story = {
  args: {
    currentLang: 'English',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
  },
};

export const WithAuth: Story = {
  args: {
    currentLang: 'English',
    showAuth: true
  },
};

export const RussianWithAuth: Story = {
  args: {
    currentLang: 'Русский',
    showAuth: true
  },
};

export const MobileWithAuth: Story = {
  args: {
    currentLang: 'English',
    showAuth: true
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
  },
};
