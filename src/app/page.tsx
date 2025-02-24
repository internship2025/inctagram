"use client";
import { Header } from "@/shared/ui/header/header";
import { useState } from "react";
import { SignUpModal } from "@/features/auth/ui/signUpModal/SignUpModal";
import { StoreProvider } from "@/services/store-provider";
import { Pagination } from "@/shared/ui/pagination/pagination";

export default function HomePage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <>
      <StoreProvider>
        <Header showAuth={false} onSignUpClick={() => setIsSignUp(true)} />
        {isSignUp && (
          <SignUpModal open={true} onClose={() => setIsSignUp(false)} />
        )}
        <Pagination />
      </StoreProvider>
    </>
  );
}
