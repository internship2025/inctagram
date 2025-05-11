"use client";

import { AccountMenegement } from "@/features/profile-settings/ui/account-menegment/AccountMenegment";
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

  let activeTab =
    (searchParams.get("tab") as ProfileTab) || "General-information";

    let success = searchParams.get("success")

    if(success){
      activeTab = "Accaunt-management"
    }


  return (
    <div>
      <AccountTabs userId={id} activeTab={activeTab} />
      {activeTab === "General-information" && <GeneralInformation />}
      {activeTab === "Accaunt-management" && <AccountMenegement success = {success}/>}

  );
};

export default EditProfile;
