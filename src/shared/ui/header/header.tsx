"use client";
import * as Select from "@radix-ui/react-select";
import styles from "./header.module.css";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/shared/ui/button/button";
import { ForgotPasswordModal } from "@/shared/ui/modal/components/forgotPasswordModal/forgotPasswordModal";
import { ForgotPasswordConfirmationModal } from "../modal/components/ForgotPasswordConfirmationModal/ForgotPasswordConfirmationModal";
import { CreateNewPasswordFormModule } from "../modal/components/CreateNewPasswordFormModule/CreateNewPasswordFormModule";

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
  showAuth?: boolean;
  onLoginClick?: () => void;
  onSignUpClick?: () => void;
}

export const Header = ({
  onLangChange,
  showAuth = false,
  onLoginClick,
  onSignUpClick,
}: HeaderProps) => {
  const [currentLang, setCurrentLang] = useState("English");
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); 
  const [showCreateModal, setShowCreateModal] = useState(false); 

  const handleLangChange = (value: string) => {
    setCurrentLang(value);
    onLangChange?.(value);
  };

  const handleModal = (type: 'password' | 'confirm' | 'create', isOpen: boolean) => {
    switch (type) {
      case 'password':
        setShowModal(isOpen);
        break;
      case 'confirm':
        setShowConfirmModal(isOpen);
        break;
      case 'create':
        setShowCreateModal(isOpen);
        break;
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>Instagram</h1>
        <Button variant={"outline"} onClick={() => handleModal('password', true)}>
          ForgotPassword
        </Button>
        <Button variant={"outline"} onClick={() => handleModal('confirm', true)}>
          ForgotPasswordConfirm
        </Button>

        <Button variant={"outline"} onClick={() => handleModal('create', true)}>
          CreateNewPassword
        </Button>

        <ForgotPasswordModal 
          open={showModal} 
          onClose={() => handleModal('password', false)} 
        />
        <ForgotPasswordConfirmationModal 
          open={showConfirmModal} 
          onClose={() => handleModal('confirm', false)} 
        />
        <CreateNewPasswordFormModule 
          open={showCreateModal} 
          onClose={() => handleModal('create', false)} 
        />

        <div className={styles.rightSection}>
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
                    alt={currentLang === "English" ? "UK flag" : "Russian flag"}
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

          {!showAuth && (
            <div className={styles.authButtons}>
              <Button variant={"outline"} onClick={onLoginClick}>
                Log in
              </Button>
              <Button variant={"primary"} onClick={onSignUpClick}>
                Sign up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
