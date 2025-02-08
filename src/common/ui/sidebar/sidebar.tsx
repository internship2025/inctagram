"use client"
import {FC, JSX} from 'react';
import Link from 'next/link';
import styles from './sidebar.module.css';
import { usePathname } from 'next/navigation';

interface NavItem {
    id: number;
    label: string;
    path: string;
    icon: JSX.Element;
}

interface SidebarProps {
    isAuthenticated?: boolean;
}

export const Sidebar: FC<SidebarProps> = ({ isAuthenticated = true }) => {
    const pathname = usePathname();
    const currentPath = pathname;

    const navItems: NavItem[] = [
        {
            id: 1,
            label: 'Home',
            path: '/',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9.02 2.84l-5.39 4.2C2.73 7.74 2 9.23 2 10.36v7.41c0 2.32 1.89 4.22 4.21 4.22h11.58c2.32 0 4.21-1.9 4.21-4.21V10.5c0-1.21-.81-2.76-1.8-3.45l-6.18-4.33c-1.4-.98-3.65-.93-5 .12zM12 17.99v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            id: 2,
            label: 'Create',
            path: '/create',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8 12h8M12 16V8M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            id: 3,
            label: 'My Profile',
            path: '/profile',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12.12 12.78a.963.963 0 00-.24 0 3.27 3.27 0 01-3.16-3.27c0-1.81 1.46-3.28 3.28-3.28a3.276 3.276 0 01.12 6.55zm6.62 6.6A9.934 9.934 0 0112 22c-2.6 0-4.96-.99-6.74-2.62.1-.94.7-1.86 1.77-2.58 2.74-1.82 7.22-1.82 9.94 0 1.07.72 1.67 1.64 1.77 2.58z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            id: 4,
            label: 'Messages',
            path: '/messages',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8.5 19H8c-4 0-6-1-6-6V8c0-4 2-6 6-6h8c4 0 6 2 6 6v5c0 4-2 6-6 6h-.5c-.31 0-.61.15-.8.4l-1.5 2c-.66.88-1.74.88-2.4 0l-1.5-2c-.16-.22-.53-.4-.8-.4z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            id: 5,
            label: 'Search',
            path: '/search',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M11.5 21a9.5 9.5 0 100-19 9.5 9.5 0 000 19zM22 22l-2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            id: 6,
            label: 'Statistics',
            path: '/statistics',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M2 22h20M2 22V12M2 22l7.5-4.5M2 12l7.5 5.5M2 12l10-7M9.5 17.5l2.5-13M9.5 17.5L12 22M12 4.5l8.5 7.5M12 22l8.5-10M20.5 12l1.5 10M20.5 12L22 22" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        }
    ];

    const authNavItems = navItems.filter(item => 
        isAuthenticated || (!isAuthenticated && ['/', '/search'].includes(item.path))
    );

    return (
        <aside className={styles.sidebar}>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    {authNavItems.map((item) => (
                        <li key={item.id} className={styles.navItem}>
                            <Link 
                                href={item.path}
                                className={`${styles.navLink} ${currentPath === item.path ? styles.active : ''}`}
                            >
                                <span className={styles.icon}>{item.icon}</span>
                                <span className={styles.label}>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};