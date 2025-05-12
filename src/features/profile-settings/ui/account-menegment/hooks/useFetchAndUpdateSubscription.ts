import { useGetCurrentSubscriptionQuery } from "@/features/profile-settings/api/profileSettings.api";

export function useFetchAndUpdateSubscription() {
  const { data, isLoading } = useGetCurrentSubscriptionQuery();

  let isVal = false;

  if (data) {
    isVal = data.hasAutoRenewal;
  }
   
  function updateSubscription(data: string) {
    const value = data.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!value) {
      return "";
    }
    const [,year, month, day] = value;
    return `${day}.${month}.${year}`;
  }

  let expire = "";
  let next = "";
  const autoRenewal = data?.hasAutoRenewal;
  
  if (data?.data && data.data.length > 0) {
    const lastSubscription = data.data[data.data.length - 1];
    expire = updateSubscription(lastSubscription.dateOfPayment);
    next = updateSubscription(lastSubscription.endDateOfSubscription);
  }

  return { expire, next, isVal, autoRenewal};
}
