import { useAppSelector } from "@/services/store";

export function useVerifyProfileAccess(id: number) {
    console.log(id)
  const authId = useAppSelector((state) => state.auth);

  const isAuth = authId.userId ? true : false;

  let isOwner = false;
  if (isAuth) {
    console.log(authId.userId, id)
    isOwner = authId.userId === id
  }

  return {
    isOwner,
    isAuth
  }
 

}
