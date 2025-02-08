"use client"
import * as Select from '@radix-ui/react-select';
import styles from './header.module.css';
import Image from 'next/image';
import {useState} from "react";


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
    onSignUpClick 
}: HeaderProps) => {

    const [currentLang, setCurrentLang] = useState('English');

    const handleLangChange = (value: string) => {
        setCurrentLang(value);
        onLangChange?.(value);
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1 className={styles.title}>Instagram</h1>
                
                <div className={styles.rightSection}>
                    <Select.Root value={currentLang} onValueChange={handleLangChange}>
                        <Select.Trigger className={styles.selectTrigger}>
                            <Select.Value>
                                <div className={styles.selectValue}>
                                    <Image 
                                        src={currentLang === 'English' ? '/flags/FlagRU.svg' : '/flags/FlagUK.svg'}
                                        alt={currentLang === 'English' ? 'UK flag' : 'Russian flag'}
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
                        <Select.Content className={styles.selectContent}>
                            <Select.Viewport>
                                <Select.Item value="English" className={styles.selectItem}>
                                    <Select.ItemText>
                                        <div className={styles.selectValue}>
                                            <Image src="/flags/FlagUK.svg" alt="UK flag" width={20} height={20} unoptimized />
                                            <span>English</span>
                                        </div>
                                    </Select.ItemText>
                                </Select.Item>
                                <Select.Item value="Русский" className={styles.selectItem}>
                                    <Select.ItemText>
                                        <div className={styles.selectValue}>
                                            <Image src="/flags/FlagRU.svg" alt="Russian flag" width={20} height={20} unoptimized />
                                            <span>Русский</span>
                                        </div>
                                    </Select.ItemText>
                                </Select.Item>
                            </Select.Viewport>
                        </Select.Content>
                    </Select.Portal>
                    </Select.Root>
                    
                    {showAuth && (
                        <div className={styles.authButtons}>
                            <button onClick={onLoginClick} className={styles.authButton}>
                                Log in
                            </button>
                            <button onClick={onSignUpClick} className={`${styles.authButton} ${styles.signUpButton}`}>
                                Sign up
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};