"use client";

import { ReactNode } from "react";
import { Header } from "@/shared/ui/header/header";
import { StoreProvider } from "@/services/store-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthGuard } from "@/services/authGuard";

type Props = {
  children: ReactNode;
};

export default function AppProvider({ children }: Props) {
  return (
    <GoogleOAuthProvider clientId="272583913867-t74i019ufdvmarh05jlv8bcu1ak0a6o6.apps.googleusercontent.com">
      <StoreProvider>
        <>
          <Header showAuth={false} />
          <AuthGuard>{children}</AuthGuard>
        </>
      </StoreProvider>
    </GoogleOAuthProvider>
  );
}
