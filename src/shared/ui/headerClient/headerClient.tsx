"use client";

import { useState } from "react";
import { SignUpModal } from "@/features/auth/ui/signUpModal/SignUpModal";
import { SignInModal } from "@/shared/ui/modal/components/signInModal/SignInModal";
import { Header } from "@/shared/ui/headerClient/header/header";

export default function HeaderClient() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);

  return (
    <>
      <Header
        showAuth={false}
        onSignUpClick={() => setIsSignUp(true)}
        onLoginClick={() => setIsSignIn(true)}
      />
      {isSignUp && (
        <SignUpModal open={true} onClose={() => setIsSignUp(false)} />
      )}
      {isSignIn && (
        <SignInModal open={true} onClose={() => setIsSignIn(false)} />
      )}
    </>
  );
}
