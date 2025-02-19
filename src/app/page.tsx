"use client";
import { Header } from "@/shared/ui/header/header";
import { ModalRadix } from "@/features/auth/ui/sign-up/sign-up-page";
import { useState } from "react";

export default function HomePage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const onSignUpHandler = () => {
    setIsSignUp(true);
  };
  return (
    <>
      <Header showAuth={false} onSignUpClick={onSignUpHandler} />;
      {isSignUp && <ModalRadix />}
    </>
  );
}
