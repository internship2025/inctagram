"use client";

import { AccountTabs } from "@/features/profile-settings/ui/general-information/accountTabs/AccountTabs";
import { GeneralInformation } from "@/features/profile-settings/ui/general-information/GeneralInformation";
import { useParams, useSearchParams } from "next/navigation";
import { MyPayments } from "@/features/profile-settings/ui/my-payments/MyPayments";

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
      {(activeTab === "General-information" && <GeneralInformation />) ||
        (activeTab === "My-payments" && <MyPayments />)}
    </div>
  );
};

export default EditProfile;
