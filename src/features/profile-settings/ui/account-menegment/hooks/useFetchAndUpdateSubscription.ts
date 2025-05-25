import { useGetCurrentSubscriptionQuery } from "@/features/profile-settings/api/profileSettings.api";

export function useFetchAndUpdateSubscription() {
  const { data, isLoading } = useGetCurrentSubscriptionQuery();


  function updateSubscription(data: string) {
    const value = data.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!value) {
      return "";
    }
    const [, year, month, day] = value;
    return `${day}.${month}.${year}`;
  }

  let expire = "";
  let next = "";
  let autoRenewal = false

  if (data?.data && data.data.length > 0) {
    const lastSubscription = data.data[data.data.length - 1];
    console.log(data, lastSubscription);
    expire = updateSubscription(lastSubscription.dateOfPayment);
    next = updateSubscription(lastSubscription.endDateOfSubscription);
    autoRenewal = lastSubscription.autoRenewal;
  }

  return { expire, next, autoRenewal };
}
