import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/shared/ui/button/button";
import { SignInModal } from "./SignInModal";

const meta: Meta<typeof SignInModal> = {
  component: SignInModal,
};

export default meta;

type Story = StoryObj<typeof meta>;

const SignInModalComponent = () => {
  const [isOpen, setOpen] = useState(true);

  return (
    <>
      <Button onClick={() => setOpen(!isOpen)}>Click</Button>
      <SignInModal open={isOpen} onClose={() => setOpen(false)} />
    </>
  );
};

export const SignIn: Story = {
  args: {},
  render: () => <SignInModalComponent />,
};
