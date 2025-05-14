import { AccountType } from "./hooks/useAccountType";
import { SubscriptionType } from "./hooks/useSubscriptionType";

type Type = Array<{
  value: SubscriptionType | AccountType;
  label: string;
  amount?: number;
}>;

export const getInputOptions = () => {
  const optionsAccount: Omit<Type, 'amount'> = [
    { value: "personal", label: "Personal" },
    { value: "business", label: "Business" },
  ];

  const optionsSubscription: Type = [
    { value: "DAY", label: "$10 per 1 Day", amount: 10 },
    { value: "WEEKLY", label: "$50 per 7 Day", amount: 50 },
    { value: "MONTHLY", label: "$100 per month", amount: 100 },
  ];

  return {
    optionsAccount,
    optionsSubscription,
  };
};
