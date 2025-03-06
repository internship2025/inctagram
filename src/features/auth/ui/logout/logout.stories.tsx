// import { Meta, StoryObj } from "@storybook/react";
// import { useState } from "react"; // Импортируем useState
// import { Button } from "@/shared/ui/button/button";
// import Logout from "./Logout";
//
// const meta: Meta<typeof Logout> = {
//   component: Logout,
//   args: {
//     showConfirmation: false,
//   },
// };
//
// export default meta;
//
// type Story = StoryObj<typeof meta>;
//
// export const Default: Story = {
//   render: (args) => {
//     const [showConfirmation, setShowConfirmation] = useState(
//       args.showConfirmation,
//     );
//
//     const confirmLogout = () => {
//       setShowConfirmation(true);
//     };
//
//     const cancelLogout = () => {
//       setShowConfirmation(false);
//     };
//
//     return (
//       <>
//         <Button onClick={confirmLogout}>Log out</Button>
//         {showConfirmation && (
//           <div>
//             <p>Are you sure you want to log out?</p>
//             <Button onClick={cancelLogout}>Cancel</Button>
//             <Button onClick={() => alert("Logged out!")}>Confirm</Button>
//           </div>
//         )}
//         <Logout />
//       </>
//     );
//   },
// };
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
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

// Создаем компонент для логики с состоянием
const LogoutWithConfirmation = ({
  showConfirmation: initialShowConfirmation,
}: {
  showConfirmation: boolean;
}) => {
  const [showConfirmation, setShowConfirmation] = useState(
    initialShowConfirmation,
  );

  const confirmLogout = () => {
    setShowConfirmation(true);
  };

  const cancelLogout = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <Button onClick={confirmLogout}>Log out</Button>
      {showConfirmation && (
        <div>
          <p>Are you sure you want to log out?</p>
          <Button onClick={cancelLogout}>Cancel</Button>
          <Button onClick={() => alert("Logged out!")}>Confirm</Button>
        </div>
      )}
      <Logout />
    </>
  );
};

export const Default: Story = {
  render: (args) => (
    <LogoutWithConfirmation showConfirmation={args.showConfirmation} />
  ),
};
