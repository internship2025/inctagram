import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/shared/ui/button/button";
import { ForgotPasswordConfirmationModal } from "./ForgotPasswordConfirmationModal";

const meta: Meta<typeof ForgotPasswordConfirmationModal> = {
  component: ForgotPasswordConfirmationModal,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ForgotPasswordConfirmation: Story = {
  args: {},
  render: () => {
    const [isOpen, setOpen] = useState(true);

    return (
      <>
        <Button onClick={() => setOpen(!isOpen)}>Click</Button>
        <ForgotPasswordConfirmationModal
          open={isOpen}
          onClose={() => {
            setOpen(false);
          }}
        />
      </>
    );
  },
};
