import { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";
import { CreateNewPasswordFormModule } from "./CreateNewPasswordFormModule";
import { Button } from "@/shared/ui/button/button";

const meta: Meta<typeof CreateNewPasswordFormModule> = {
  component: CreateNewPasswordFormModule,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const CreateNewPassword: Story = {
  args: {},
  render: () => {
    const [isOpen, setOpen] = useState(true);

    return (
      <>
        <Button onClick={() => setOpen(!isOpen)}>Click</Button>
        <CreateNewPasswordFormModule
          open={isOpen}
          onClose={() => {
            setOpen(false);
          }}
        />
      </>
    );
  },
};
