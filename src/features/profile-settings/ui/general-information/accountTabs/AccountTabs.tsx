import Link from "next/link";
import s from "./AccountTabs.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProfileTab } from "@/app/profile/[id]/edit-profile/page";
import { useEffect } from "react";

type AccountTabsType = {
  userId: number | undefined;
  activeTab: ProfileTab;
};

export const AccountTabs = ({ userId, activeTab }: AccountTabsType) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    if (!searchParams.get("tab")) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("tab", "General-information");
      router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    }
  }, [searchParams, pathname, router]);

  const TABS = [
    {
      id: "General-information",
      href: `/profile/${userId}/edit-profile?tab=General-information`,
      label: "General information",
    },
    {
      id: "Devices",
      href: `/profile/${userId}/edit-profile?tab=Devices`,
      label: "Devices",
    },
    {
      id: "Account-management",
      href: `/profile/${userId}/edit-profile?tab=Account-management`,
      label: "Account management",
    },
    {
      id: "My-payments",
      href: `/profile/${userId}/edit-profile?tab=My-payments`,
      label: "My payments",
    },
  ];

  const tabs = TABS.map((it) => {
    return (
      <Link
        key={it.id}
        href={it.href}
        className={`${s.tabs} ${activeTab === it.id ? s.active : ""}`}
      >
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
