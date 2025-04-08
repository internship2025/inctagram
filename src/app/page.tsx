import Logout from "@/features/auth/ui/logout/Logout";
import GuestHomePage from "@/features/home-page/ui/guestHomePage/GuestHomePage";

const HomePage = () => {
  return (
    <div>
      <GuestHomePage />
      <Logout />
    </div>
  );
};

export default HomePage;
