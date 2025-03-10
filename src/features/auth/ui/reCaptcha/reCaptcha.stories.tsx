import { Meta, StoryObj } from "@storybook/react";
import { Recaptcha } from "@/features/auth/ui/reCaptcha/reCaptcha";

const meta: Meta<typeof Recaptcha> = {
  title: "Recaptcha",
  component: Recaptcha,
  tags: ["autodocs"],
  argTypes: {
    onVerify: { action: "verified" },
  },
};

export default meta;

type Story = StoryObj<typeof Recaptcha>;

export const Default: Story = {
  args: {
    siteKey: "6LfpOuMqAAAAAE9xTZ1PP4CH-WUsTq5al9vEw0nJ",
    onVerify: (token) => console.log("reCAPTCHA token:", token),
  },
};

export const ErrorState: Story = {
  args: {
    siteKey: "6LfpOuMqAAAAAE9xTZ1PP4CH-WUsTq5al9vEw0nJ",
  },
  render: (args) => {
    // Имитируем вызов onVerify или других доступных функций
    setTimeout(() => {
      // Допустим, мы вызываем onVerify с ошибкой
      args.onVerify("error-token");
    }, 1000);

    return <Recaptcha {...args} />;
  },
};

export const ExpiredState: Story = {
  args: {
    siteKey: "6LfpOuMqAAAAAE9xTZ1PP4CH-WUsTq5al9vEw0nJ",
  },
  render: (args) => {
    // Имитируем вызов onVerify или других доступных функций
    setTimeout(() => {
      args.onVerify("expired-token");
    }, 1000);

    return <Recaptcha {...args} />;
  },
};
