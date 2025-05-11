"use client";

import { ReactNode } from "react";
import { Header } from "@/shared/ui/header/header";
import { StoreProvider } from "@/services/store-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SidebarWrapper } from "@/shared/ui/sidebar/SidebarWrapper";
import ErrorBoundaryWrapper from "@/services/ErrorBoundary/ErrorBoundaryWrapper";
import s from "./appProvider.module.css";
import { GlobalErrorHandler } from "./globalErrorHandler";

type Props = {
  children: ReactNode;
};

export default function AppProvider({ children }: Props) {
  return (
    <GoogleOAuthProvider clientId="272583913867-t74i019ufdvmarh05jlv8bcu1ak0a6o6.apps.googleusercontent.com">
      <StoreProvider>
        <ErrorBoundaryWrapper>
        <GlobalErrorHandler />
          <Header />
          <div className={s.wrapper}>
            <SidebarWrapper />
            <main className={s.container}>{children}</main>
          </div>
        </ErrorBoundaryWrapper>
      </StoreProvider>
    </GoogleOAuthProvider>
  );
}