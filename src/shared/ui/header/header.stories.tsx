import { Header } from "./header";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Header> = {
  component: Header,
  tags: ["autodocs"],
  argTypes: {
    onLangChange: {
      description: "Callback функция, вызываемая при смене языка",
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    onLangChange: (lang: string) => console.log("Language changed to:", lang),
  },
};

export const WithCallback: Story = {
  args: {
    onLangChange: (lang: string) => alert(`Language changed to: ${lang}`),
  },
  parameters: {
    docs: {
      description: {
        story: "Пример с обработкой смены языка через callback функцию",
      },
    },
  },
};

export const Mobile: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: "Мобильная версия компонента с адаптивным дизайном",
      },
    },
  },
};
