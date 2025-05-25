import { RadioButton } from "@/shared/ui/radiobutton/radioButton";
import { getInputOptions } from "../getInputOptions";
import { AccountType } from "../hooks/useAccountType";
import { SubscriptionType } from "../hooks/useSubscriptionType";
import { SubscriptionLayout } from "../subscription-layout/SubscriptionLayout";
import s from "./Account.module.css";

type Props = {
  onValueChange: (type: AccountType) => void;
  accountType: AccountType
};

export const Account = ({ onValueChange, accountType }: Props) => {
  return (
      <SubscriptionLayout title="Account type">
        {() => {
          return (
            <RadioButton
            defaultValue={accountType}
              onValueChange={
                onValueChange as (value: SubscriptionType | AccountType) => void
              }
              options={getInputOptions().optionsAccount}
              stylesOverride={{ direction: s.direction }}
            />
          );
        }}
      </SubscriptionLayout>
  );
};



