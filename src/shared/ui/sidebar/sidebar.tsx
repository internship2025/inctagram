"use client";
import { FC } from "react";
import Link from "next/link";
import styles from "./sidebar.module.css";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAppSelector } from "@/services/store";

interface NavItem {
  id: number;
  label: string;
  path: string;
  icon: string;
}

interface SidebarProps {
  isAuthenticated?: boolean;
}

export const Sidebar: FC<SidebarProps> = ({ isAuthenticated = true }) => {
  const pathname = usePathname();
  const userId = useAppSelector((state) => state.auth.userId);

  const currentPath = pathname;

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
    },
  ];

  const authNavItems = navItems.filter(
    (item) =>
      isAuthenticated ||
      (!isAuthenticated && ["/", "/search"].includes(item.path)),
  );

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {authNavItems.map((item) => (
            <li key={item.id} className={styles.navItem}>
              <Link
                href={item.path}
                className={`${styles.navLink} ${currentPath === item.path ? styles.active : ""}`}
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
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
