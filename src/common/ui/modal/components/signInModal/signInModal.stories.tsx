import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/common/ui/button/button";
import { SignInModal } from "./SignInModal";



const meta: Meta<typeof SignInModal> = {
  title: "Example/Components/Modal",
  component: SignInModal,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const SignIn: Story = {
  args: {},
  render: () => {
    const [isOpen, setOpen] = useState(true);

    return (
      <>
        <Button onClick={()=>setOpen(!isOpen)}>Click</Button>
        <SignInModal
          open={isOpen}
          onClose={() => {
            setOpen(false);
          }}
        />
      </>
    );
  },
};


