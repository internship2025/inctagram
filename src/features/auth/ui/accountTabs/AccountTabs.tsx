import Link from "next/link";
import s from "./AccountTabs.module.css";
import { ProfileTab } from "../../page";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type AccountTabsType = {
  userId: number | undefined
  activeTab: ProfileTab
};

export const AccountTabs = ({ userId,  activeTab }: AccountTabsType) => {
  const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
     
    if(!searchParams.get('tab')){
      const newParams = new URLSearchParams(searchParams);
      newParams.set('tab', 'General-information');
      router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    }
  const TABS = [
    {
      id: "General-information",
      href: `/profile/${userId}/edit-profile?tab=General-information`,
      label: "General information",
    },
    { id: "Devices", href: `/profile/${userId}/edit-profile?tab=Devices`, label: "Devices" },
    {
      id: "Accaunt-management",
      href: `/profile/${userId}/edit-profile?tab=Accaunt-management`,
      label: "Accaunt management",
    },
    {
      id: "My-payments",
      href: `/profile/${userId}/edit-profile?tab=My-payments`,
      label: "My payments",
    },
  ];

  const tabs = TABS.map((it) => {
    return (
      <Link key={it.id} href={it.href} className={`${s.tabs} ${activeTab === it.id ? s.active : ''}`}>
        {it.label}
        <span className={`${s.tabLine}`} />
      </Link>
    );
  });

  return (
    <div className={s.tabsWrapper}>
      {tabs}
      <div className={s.globalLine} />
    </div>
  );
};
