import { RadioButton } from "@/shared/ui/radiobutton/radioButton";
import { getInputOptions } from "../getInputOptions";
import { AccountType } from "../hooks/useAccountType";
import { SubscriptionType } from "../hooks/useSubscriptionType";
import { SubscriptionLayout } from "../subscription-layout/SubscriptionLayout";
import s from "./SubscriptionCosts.module.css";

type Props = {
  onValueChange: (type: SubscriptionType) => void;
};

export const SubscriptionCosts = ({ onValueChange }: Props) => {
  return (
    <SubscriptionLayout title="Change your subscription">
      {() => {
        return (
          <RadioButton
            defaultValue="DAY"
            onValueChange={
              onValueChange as (value: SubscriptionType | AccountType) => void
            }
            options={getInputOptions().optionsSubscription}
            stylesOverride={{ direction: s.direction }}
          />
        );
      }}
    </SubscriptionLayout>
  );
};
