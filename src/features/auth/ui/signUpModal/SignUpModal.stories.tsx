import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/shared/ui/button/button";
import { SignUpModal } from "./SignUpModal";
import { store } from "next/dist/build/output/store";
import { Provider } from "react-redux";

const meta: Meta<typeof SignUpModal> = {
  component: SignUpModal,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const SignUp: Story = {
  args: {},
  render: () => {
    const [isOpen, setOpen] = useState(true);

    return (
      <>
        <Button onClick={() => setOpen(!isOpen)}>Click</Button>
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
