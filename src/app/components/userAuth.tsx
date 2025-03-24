'use client'
import { useMeQuery } from "@/features/auth/api/auth.api";
import GuestHomePage from "./guestHomePage/GuestHomePage";
import { useAppDispatch } from "@/services/store";
import { useEffect } from "react";
import { setAuthenticated } from "@/features/auth/api/authSlice";



const UserAuth = ()=>{
    const { data: userData, isFetching } = useMeQuery();
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (userData) {
        dispatch(setAuthenticated({ isAuth: true }));
      }
    }, [userData]);
    

return (
   <div>
      
   </div>
)
}

export default UserAuth


