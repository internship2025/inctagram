"use client";

import { useParams, useSearchParams } from "next/navigation";

import { GeneralInformation } from "./sections/generalTab/GeneralInformation";
import { AccountTabs } from "@/features/auth/ui/accountTabs/AccountTabs";


export type ProfileTab =
  | "General-information"
  | "Devices"
  | "Accaunt-management"
  | "My-payments";

const EditProfile = () => {

  const searchParams = useSearchParams();
  const { id } = useParams() as { id: number | undefined };


  const activeTab =
    (searchParams.get("tab") as ProfileTab) || "General-information";



  return (
    <div>
      <AccountTabs userId={id} activeTab={activeTab} />
       {activeTab === 'General-information' && <GeneralInformation/>}
    </div>
  );
};

export default EditProfile;
