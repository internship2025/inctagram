"use client";

import { FC, useState } from "react";
import Link from "next/link";
import styles from "./sidebar.module.css";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Logout from "@/features/auth/ui/logout/Logout";
import { useAppSelector } from "@/services/store";
import { CreatePost } from "@/features/create-post/ui/createPost";
import { useMeQuery } from "@/features/auth/api/auth.api";
import { PATH } from "@/shared/constants/app-paths";
import { toast } from "react-toastify";

interface NavItem {
  id: number;
  label: string;
  path: string;
  icon: string;
  component?: React.ReactNode;
  onClick?: () => void;
}

interface SidebarProps {
  isAuthenticated?: boolean;
}

export const Sidebar: FC<SidebarProps> = ({ isAuthenticated = true }) => {
  const pathname = usePathname();
  const userId = useAppSelector((state) => state.auth.userId);

  const { data: getMeData } = useMeQuery();
  const router = useRouter();

  const currentPath = pathname;
  const [isCreatingPost, setIsCreatingPost] = useState<boolean>(false);

  const navItems: NavItem[] = [
    {
      id: 1,
      label: "Home",
      path: "/",
      icon: "/icons/home-outline.svg",
    },
    {
      id: 2,
      label: "Create",
      path: "/create",
      icon: "/icons/create-outline.svg",
      onClick: () => setIsCreatingPost(true),
    },
    {
      id: 3,
      label: "My Profile",
      path: `/profile/${userId}`,
      icon: "/icons/myProfile-outline.svg",
    },
    {
      id: 4,
      label: "Messages",
      path: "/messages",
      icon: "/icons/messenger-outline.svg",
    },
    {
      id: 5,
      label: "Search",
      path: "/search",
      icon: "/icons/search-outline.svg",
    },
    {
      id: 6,
      label: "Statistics",
      path: "/statistics",
      icon: "/icons/trending-up-outline.svg",
    },
    {
      id: 7,
      label: "Favorites",
      path: "/favorites",
      icon: "/icons/bookmark-outline.svg",
    },
    {
      id: 8,
      label: "Log Out",
      path: "/logout",
      icon: "/icons/logOut-outline.svg",
      component: <Logout />,
    },
  ];

  const authNavItems = navItems.filter(
    (item) =>
      isAuthenticated ||
      (!isAuthenticated && ["/", "/search"].includes(item.path)),
  );

  const onPostPublished = () => {
    setIsCreatingPost(false);
    toast.success("Post has been published successfully");
    if (getMeData?.userId) {
      router.push(PATH.PROFILE.replace(":id", getMeData?.userId?.toString()));
    }
  };

  return (
    <aside className={styles.sidebar}>
      {isCreatingPost && (
        <CreatePost
          onPostPublished={onPostPublished}
          onOpenChange={setIsCreatingPost}
          open={isCreatingPost}
        />
      )}
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {authNavItems.map((item) => (
            <li key={item.id} className={styles.navItem}>
              {item.onClick ? (
                <button
                  className={`${styles.navLink} ${styles.navButton}`}
                  onClick={item.onClick}
                >
                  <span className={styles.icon}>
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={24}
                      height={24}
                    />
                  </span>
                  <span className={styles.label}>{item.label}</span>
                </button>
              ) : (
                <Link
                  href={item.path}
                  className={`${styles.navLink} ${currentPath === item.path ? styles.active : ""}`}
                  onClick={(e) => item.component && e.preventDefault()}
                >
                  <span className={styles.icon}>
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={24}
                      height={24}
                    />
                  </span>
                  {item.component || (
                      <span className={styles.label}>{item.label}</span>
                  )}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
