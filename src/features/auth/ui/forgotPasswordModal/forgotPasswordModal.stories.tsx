import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/shared/ui/button/button";
import { ForgotPasswordModal } from "./forgotPasswordModal";

const meta: Meta<typeof ForgotPasswordModal> = {
  component: ForgotPasswordModal,
};

export default meta;

type Story = StoryObj<typeof meta>;

const ForgotPasswordModalComponent = () => {
  const [isOpen, setOpen] = useState(true);

  return (
    <>
      <Button onClick={() => setOpen(!isOpen)}>Click</Button>
      <ForgotPasswordModal open={isOpen} onClose={() => setOpen(false)} />
    </>
  );
};

export const ForgotPassword: Story = {
  args: {},
  render: () => <ForgotPasswordModalComponent />,
};
