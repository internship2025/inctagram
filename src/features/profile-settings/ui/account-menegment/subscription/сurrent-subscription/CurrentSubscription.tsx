import { SubscriptionLayout } from "../../subscription-layout/SubscriptionLayout";
import s from "./CurrentSubscription.module.css";
import { AutoReneval } from "../reneval/AutoReneval";
import { useFetchAndUpdateSubscription } from "../../hooks/useFetchAndUpdateSubscription";

export const CurrentSubscription = () => {
  const { expire, next, autoRenewal, isVal} =
    useFetchAndUpdateSubscription();

  return (
    <>
      <SubscriptionLayout title="Current Subscription">
        {() => {
          return (
            <div className={s.wrapper}>
              <div className={s.column}>
                <span className={s.element}>Expire at</span>
                <span>{expire}</span>
              </div>
              <div className={s.column}>
                <span className={s.element}>Next payment</span>
                <span>{next}</span>
              </div>
            </div>
          );
        }}
      </SubscriptionLayout>
      <AutoReneval disableCheck = {isVal} isCheck={autoRenewal} />
    </>
  );
};
