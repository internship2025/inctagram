import { useState } from "react";
import { getInputOptions } from "../getInputOptions";

export type SubscriptionType = "DAY" | "WEEKLY" | "MONTHLY";

export const useSubscriptionType = () => {
  const [subscriptionType, setSubscription] = useState<SubscriptionType>("DAY");

  const getAmount = (type: SubscriptionType): number => {
    return (
      getInputOptions().optionsSubscription.find((opt) => opt.value === type)
        ?.amount || 0
    );
  };

  const amount = getAmount(subscriptionType);

  function handleSubscriptionTypeChange(type: SubscriptionType) {
    setSubscription(type);
  }

  return {
    subscriptionType,
    handleSubscriptionTypeChange,
    amount,
  };
};
