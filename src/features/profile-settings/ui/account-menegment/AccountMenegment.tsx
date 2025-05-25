import s from "./AccountMenegement.module.css";
import { useAccountType } from "./hooks/useAccountType";
import { SubscriptionCosts } from "./subscription/SubscriptionCosts";
import { Account } from "./account/Account";
import { useSubscriptionType } from "./hooks/useSubscriptionType";
import { PaymentButtons } from "./subscription/PaymentButtons";
import { AlertModal } from "./subscription/alert-modal/AlertModal";
import { CurrentSubscription } from "./subscription/сurrent-subscription/CurrentSubscription";
import { Loader } from "@/shared/ui/loader/Loader";
import { useSetSubscription } from "./hooks/useSetSubscription";

type Props = {
  success: string | null;
};

export function AccountMenegement({ success }: Props) {

  
  const { accountType, handleAccountTypeChange } = useAccountType();
  const { subscriptionType, handleSubscriptionTypeChange, amount } =
    useSubscriptionType();
  const { handler, isLoading } = useSetSubscription();

  if (isLoading)
    return (
      <div className={s.loader}>
        <Loader size="large" />
      </div>
    );



  return (
    <div className={s.wrapper}>
      <CurrentSubscription />

      <Account
        accountType={accountType}
        onValueChange={handleAccountTypeChange}
      />
      {accountType === "business" && (
        <>
          <SubscriptionCosts onValueChange={handleSubscriptionTypeChange} />
          <PaymentButtons
            handler={handler}
            amount={amount}
            subscriptionType={subscriptionType}
          />
        </>
      )}
      {success && (
        <AlertModal
          text={
            success === "true"
              ? "Payment was successful!"
              : "Transaction failed, please try again"
          }
        />
      )}
    </div>
  );
}
