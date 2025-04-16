"use client";

import { AddAvatarSection } from "@/features/profile-settings/ui/general-information/addAvatarSection";
import { Button } from "@/shared/ui/button/button";
import { useState } from "react";
import { GetUserProfileResponse } from "@/features/home-page/ui/user-profile/api/types";

type GeneralInformationFormProps = {
  profileInfo: GetUserProfileResponse;
};

const ClientTest = ({ profileInfo }: GeneralInformationFormProps) => {
  const [showModal, setShowModal] = useState();

  return (
    <div>
      <Button variant={"text"}>
        {" "}
        <AddAvatarSection avatars={profileInfo?.avatars} />
      </Button>
    </div>
  );
};

export default ClientTest;
