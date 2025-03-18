import { createSlice } from "@reduxjs/toolkit";



type AuthState = {
    isAuthenticated: boolean;
  }
  
  const initialState: AuthState = {
    isAuthenticated: true,
  };


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: (create)=>({
        setAuthenticated: create.reducer<{isAuth: boolean}>((state, action)=>{
             state.isAuthenticated = action.payload.isAuth
        })
    })
})


export const { setAuthenticated } = authSlice.actions;
export default authSlice.reducer;