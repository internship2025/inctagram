import { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";
import { Button } from "@/common/ui/button/button";
import { EmailSentModal } from "./EmailSentModal";


const meta: Meta<typeof EmailSentModal> = {
  title: "Example/Components/Modal",
  component: EmailSentModal,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const EmailSent: Story = {
  args: { email: "sss" },
  render: (props) => {
    const [isOpen, setOpen] = useState(true);

    return (
      <>
        <Button onClick={() => setOpen(!isOpen)}>Click</Button>
        <EmailSentModal
          email={props.email}
          open={isOpen}
          onClose={() => {
            setOpen(false);
          }}
        />
      </>
    );
  },
};
