import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react"; // Импортируем useState
import { Button } from "@/shared/ui/button/button";
import Logout from "./Logout";

const meta: Meta<typeof Logout> = {
  component: Logout,
  args: {
    showConfirmation: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [showConfirmation, setShowConfirmation] = useState(args.showConfirmation);

    return (
      <>
        <Button onClick={() => setShowConfirmation(!showConfirmation)}>
          Open Logout
        </Button>
        <Logout />
      </>
    );
  },
};
