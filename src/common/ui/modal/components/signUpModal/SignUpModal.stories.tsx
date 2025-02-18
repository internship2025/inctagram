import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";import { Button } from "@/common/ui/button/button";
import { SignUpModal } from "./SignUpModal";



const meta: Meta<typeof SignUpModal> = {
  title: "Example/Components/Modal",
  component: SignUpModal,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const SignUp: Story = {
  args: {},
  render: () => {
    const [isOpen, setOpen] = useState(true);

    return (
      <>
        <Button onClick={()=>setOpen(!isOpen)}>Click</Button>
        <SignUpModal
          open={isOpen}
          onClose={() => {
            setOpen(false);
          }}
        />
      </>
    );
  },
};


