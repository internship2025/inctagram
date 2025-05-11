import { useCreatePremiumSubscriptionMutation } from "@/features/profile-settings/api/profileSettings.api";
import { PaymentMethod } from "./usePaymentHandlers";
import { SubscriptionType } from "./useSubscriptionType";


type SubscriptionErrorType = {
  statusCode: number;
  messages: [
    {
      message: string;
      field: string;
    },
  ];
  error: string;
};

export type DataType = {
  amount: number;
  paymentType: PaymentMethod;
  typeSubscription: SubscriptionType;
  baseUrl: string;
};

export const useSetSubscription = () => {
  const [signup, { isLoading, isError, isSuccess }] =
    useCreatePremiumSubscriptionMutation();



  const handleSubscription = (url: string | undefined) => {
    if (url) window.location.assign(url);
  };

  const handler = (data: DataType) => {
    signup(data)
      .then((res) => {
        handleSubscription(res.data?.url);
      })
      .catch((er: SubscriptionErrorType) => {
        console.log(er.messages[0].message);
      });
  };

  return { handler, isLoading };
};
