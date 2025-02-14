import { Header } from "./header";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Header",
  component: Header,
  tags: ["autodocs"],
  argTypes: {
    onLangChange: {
      description: 'Callback функция, вызываемая при смене языка',
      control: false
    },
    showAuth: {
      description: 'Флаг для отображения кнопок авторизации',
      control: 'boolean',
      defaultValue: true
    },
    onLoginClick: {
      description: 'Callback функция, вызываемая при нажатии на кнопку Log in',
      control: false
    },
    onSignUpClick: {
      description: 'Callback функция, вызываемая при нажатии на кнопку Sign up',
      control: false
    }
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    showAuth: true,
    onLangChange: (lang: string) => console.log('Language changed to:', lang),
    onLoginClick: () => console.log('Login clicked'),
    onSignUpClick: () => console.log('Sign up clicked')
  }
};

export const WithoutAuth: Story = {
  args: {
    showAuth: false,
    onLangChange: (lang: string) => console.log('Language changed to:', lang)
  }
};  

export const WithCallback: Story = {
  args: {
    onLangChange: (lang: string) => alert(`Language changed to: ${lang}`)
  },
  parameters: {
    docs: {
      description: {
        story: 'Пример с обработкой смены языка через callback функцию'
      }
    }
  }
};

export const Mobile: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Мобильная версия компонента с адаптивным дизайном'
      }
    }
  },
};

export const WithAuth: Story = {
  args: {
    showAuth: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Вариант с отображением кнопок авторизации (Log in и Sign up)'
      }
    }
  }
};

export const MobileWithAuth: Story = {
  args: {
    showAuth: true
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Мобильная версия с кнопками авторизации'
      }
    }
  },
};
