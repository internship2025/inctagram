import { useState } from "react";

export type AccountType = "personal" | "business";

export const useAccountType = () => {
  const [accountType, setAccountType] = useState<AccountType>("personal");

  function handleAccountTypeChange(type: AccountType) {
    setAccountType(type);
  }

  return {
    accountType,
    handleAccountTypeChange,
  };
};
