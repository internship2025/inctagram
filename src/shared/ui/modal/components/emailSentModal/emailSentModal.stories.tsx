import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/shared/ui/button/button";
import { EmailSentModal } from "./EmailSentModal";

const meta: Meta<typeof EmailSentModal> = {
  component: EmailSentModal,
};

export default meta;

type Story = StoryObj<typeof meta>;

const EmailSentComponent = ({ email }: { email: string }) => {
  const [isOpen, setOpen] = useState(true);

  return (
    <>
      <Button onClick={() => setOpen(!isOpen)}>Click</Button>
      <EmailSentModal
        email={email}
        open={isOpen}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export const EmailSent: Story = {
  args: { email: "sss" },
  render: (args) => <EmailSentComponent {...args} />,
};
