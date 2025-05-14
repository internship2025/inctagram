import { useCanselRenevalAutoMutation } from "@/features/profile-settings/api/profileSettings.api";

export const useToggleAutoSubscription = (isCheck: boolean) => {
  const [signup, { isLoading }] = useCanselRenevalAutoMutation();
  
  function handler() {
    if (isCheck) {
      signup();
    }
  }

  return { handler, isLoading };
};
