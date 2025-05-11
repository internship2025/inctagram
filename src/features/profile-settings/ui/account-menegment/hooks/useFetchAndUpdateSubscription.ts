import { useGetCurrentSubscriptionQuery } from "@/features/profile-settings/api/profileSettings.api";


export function useFetchAndUpdateSubscription() {
  const { data } = useGetCurrentSubscriptionQuery();
  
  let isVal = false;

  if(data){
   isVal = data?.data.length > 0 ? true : false 
  }
  
  function updateSubscription(data: string) {
    let value = data.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!value) {
      return "";
    }
    let [, year, month, day] = value;
    return `${day}.${month}.${year}`;
  }
  let expire = '';
  let next = '';
  let autoRenewal = data?.hasAutoRenewal
  if (data) {
    expire = updateSubscription(data.data[data.data.length - 1].dateOfPayment);
    next = updateSubscription(
      data.data[data.data.length - 1].endDateOfSubscription
    );
  }

  return {expire, next, isVal, autoRenewal};
}
