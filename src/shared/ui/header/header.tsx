"use client";

import * as Select from "@radix-ui/react-select";
import styles from "./header.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button/button";
import Link from "next/link";
import { Typography } from "@/shared/ui/typography/typography";
import { useAppDispatch } from "@/services/store";
import { useMeQuery } from "@/features/auth/api/auth.api";
import { setAuthenticated } from "@/features/auth/api/authSlice";
import { NotificationBell } from "../notificationBell/NotificationBell";
import { PATH } from "@/shared/constants/app-paths";

const ChevronDownIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface HeaderProps {
  onLangChange?: (lang: string) => void;
}

export const Header = ({ onLangChange }: HeaderProps) => {
  const [currentLang, setCurrentLang] = useState("English");

  const { data: userData, isFetching } = useMeQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userData && !isFetching) {
      dispatch(setAuthenticated({ userId: userData.userId }));
      localStorage.setItem("userName", userData.userName);
    }
  }, [userData, isFetching, dispatch]);

  const handleLangChange = (value: string) => {
    setCurrentLang(value);
    onLangChange?.(value);
  };

  return (
    <header id="header" className={styles.header}>
      <div className={styles.container}>
        <Link href={userData ? PATH.PROFILE.replace(":id", userData.userId.toString()) : PATH.ROOT}>
          <Typography variant={"h1"}>Inctagram</Typography>
        </Link>
        {isFetching ? (
          <div>Loading</div>
        ) : (
          <div className={styles.rightSection}>
            {userData && <NotificationBell />}
            <Select.Root
              value={currentLang}
              onValueChange={handleLangChange}
              defaultOpen={false}
            >
              <Select.Trigger className={styles.selectTrigger}>
                <Select.Value>
                  <div className={styles.selectValue}>
                    <Image
                      src={
                        currentLang === "English"
                          ? "/flags/FlagUK.svg"
                          : "/flags/FlagRU.svg"
                      }
                      alt={
                        currentLang === "English" ? "UK flag" : "Russian flag"
                      }
                      width={20}
                      height={20}
                      unoptimized
                    />
                    <span>{currentLang}</span>
                    <Select.Icon className={styles.selectIcon}>
                      <ChevronDownIcon />
                    </Select.Icon>
                  </div>
                </Select.Value>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content
                  position="popper"
                  side="bottom"
                  align="start"
                  sideOffset={5}
                  className={styles.selectContent}
                  onCloseAutoFocus={(event) => event.preventDefault()}
                >
                  <Select.Viewport>
                    <Select.Item value="English" className={styles.selectItem}>
                      <Select.ItemText>
                        <div className={styles.selectValue}>
                          <Image
                            src="/flags/FlagUK.svg"
                            alt="UK flag"
                            width={20}
                            height={20}
                            unoptimized
                          />
                          <span>English</span>
                        </div>
                      </Select.ItemText>
                    </Select.Item>
                    <Select.Item value="Русский" className={styles.selectItem}>
                      <Select.ItemText>
                        <div className={styles.selectValue}>
                          <Image
                            src="/flags/FlagRU.svg"
                            alt="Russian flag"
                            width={20}
                            height={20}
                            unoptimized
                          />
                          <span>Русский</span>
                        </div>
                      </Select.ItemText>
                    </Select.Item>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>

            <div className={styles.authButtons}>
              {!userData && (
                <>
                  <Link href="/auth/sign-in" className={styles.signInButton}>
                    <Button variant="text">Log in</Button>
                  </Link>
                  <Link href="/auth/sign-up">
                    <Button variant="primary">Sign up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
