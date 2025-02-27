"use client";

import { CreateNewPasswordFormModule } from "@/shared/ui/modal/components/CreateNewPasswordFormModule/CreateNewPasswordFormModule";
import { useState } from "react";

const ResoveryPassword = () => {
  const [open, onClose] = useState(true);


  return (
    <CreateNewPasswordFormModule open={open} onClose={() => onClose(false)} />
  );
};

export default ResoveryPassword;
