'use client'
import { useMeQuery } from "@/features/auth/api/auth.api";
import GuestHomePage from "./guestHomePage/GuestHomePage";



const UserAuth = ()=>{
    const { data: userData, isFetching } = useMeQuery();
   console.log('UserAuth', userData)

return (
   <div>
      
   </div>
)
}

export default UserAuth


