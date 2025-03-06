"use client";
import { Header } from "@/shared/ui/header/header";
import { useState } from "react";
import { SignUpModal } from "@/features/auth/ui/signUpModal/SignUpModal";
import { SignInModal } from "@/shared/ui/modal/components/signInModal/SignInModal";

export default function HomePage() {
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
