import { useState } from "react";
import { DataType } from "./useSetSubscription";

export const useHandleSubscription = (
  data: DataType,
  handler: (data: DataType) => void,
) => {
  const [isCheck, setIsCheck] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const disabled = !isCheck || isDisable;

  function handlerSubscription() {
    if (isCheck) {
      setIsDisable(true);
      handler(data);
    }
  }

  return { handlerSubscription, isCheck, setIsCheck, disabled, setIsDisable };
};
