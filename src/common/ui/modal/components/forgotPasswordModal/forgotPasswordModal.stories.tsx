import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/common/ui/button/button";
import { ForgotPasswordModal } from "./forgotPasswordModal";



const meta: Meta<typeof ForgotPasswordModal> = {
  title: "Example/Components/Modal",
  component: ForgotPasswordModal,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ForgotPassword: Story = {
  args: {},
  render: () => {
    const [isOpen, setOpen] = useState(true);

    return (
      <>
        <Button onClick={()=>setOpen(!isOpen)}>Click</Button>
        <ForgotPasswordModal
          open={isOpen}
          onClose={() => {
            setOpen(false);
          }}
        />
      </>
    );
  },
};


