import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CreateNewPasswordFormModule } from "./CreateNewPasswordFormModule";
import { Button } from "@/shared/ui/button/button";

const meta: Meta<typeof CreateNewPasswordFormModule> = {
  component: CreateNewPasswordFormModule,
};

export default meta;

type Story = StoryObj<typeof meta>;

const CreateNewPasswordComponent = () => {
  const [isOpen, setOpen] = useState(true);

  return (
    <>
      <Button onClick={() => setOpen(!isOpen)}>Click</Button>
      <CreateNewPasswordFormModule
        open={isOpen}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export const CreateNewPassword: Story = {
  args: {},
  render: () => <CreateNewPasswordComponent />,
};
