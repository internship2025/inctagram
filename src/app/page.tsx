import GuestHomePage from "./components/guestHomePage/GuestHomePage";
import UserAuth from "./components/userAuth";

const HomePage = () => {
  return (
    <div>
      <UserAuth />
      <GuestHomePage />
    </div>
  );
};

export default HomePage;
