import { useCreatePremiumSubscriptionMutation } from "@/features/profile-settings/api/profileSettings.api";
import { PaymentMethod } from "./usePaymentHandlers";
import { SubscriptionType } from "./useSubscriptionType";
import { useRef, useState } from "react";
import { DataType } from "./useSetSubscription";


export const useHandleSubscription = (
  data: DataType,
  handler: (data: DataType) => void
) => {
  const [isCheck, setIschek] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  let disabled = !isCheck || isDisable;

  function handlerSubscription() {
    if (isCheck) {
      setIsDisable(true);
      handler(data);
    }
  }

  return {handlerSubscription, isCheck, setIschek, disabled, setIsDisable };
};
