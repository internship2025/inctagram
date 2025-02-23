"use client";
import { Header } from "@/shared/ui/header/header";
import { useState } from "react";
import { SignUpModal } from "@/features/auth/ui/signUpModal/SignUpModal";

export default function HomePage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <>
      <Header showAuth={false} onSignUpClick={() => setIsSignUp(true)} />
      {isSignUp && (
        <SignUpModal open={true} onClose={() => setIsSignUp(false)} />
      )}
    </>
  );
}
