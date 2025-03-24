import { createSlice } from "@reduxjs/toolkit";



type AuthState = {
    userId: number | null;
  }
  
  const initialState: AuthState = {
    userId: null,
  };


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: (create)=>({
        setAuthenticated: create.reducer<{userId: number}>((state, action)=>{
             state.userId = action.payload.userId
        })
    })
})


export const { setAuthenticated } = authSlice.actions;
export default authSlice.reducer;