"use client";

import { AccountTabs } from "@/features/profile-settings/ui/general-information/accountTabs/AccountTabs";
import { GeneralInformation } from "@/features/profile-settings/ui/general-information/GeneralInformation";
import { useParams, useSearchParams } from "next/navigation";

export type ProfileTab =
  | "General-information"
  | "Devices"
  | "Account-management"
  | "My-payments";

const EditProfile = () => {
  const searchParams = useSearchParams();
  const { id } = useParams() as { id: number | undefined };
  const activeTab =
    (searchParams.get("tab") as ProfileTab) || "General-information";

  return (
    <div>
      <AccountTabs userId={id} activeTab={activeTab} />
      <GeneralInformation />
    </div>
  );
};

export default EditProfile;
