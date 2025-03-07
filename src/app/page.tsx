"use client";
import { Header } from "@/shared/ui/header/header";
import { useState } from "react";
import { SignUpModal } from "@/features/auth/ui/signUpModal/SignUpModal";
import { StoreProvider } from "@/services/store-provider";
import { SignInModal } from "@/shared/ui/modal/components/signInModal/SignInModal";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function HomePage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);

  return (
    <>
      <GoogleOAuthProvider clientId="272583913867-t74i019ufdvmarh05jlv8bcu1ak0a6o6.apps.googleusercontent.com">
        <StoreProvider>
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
        </StoreProvider>
      </GoogleOAuthProvider>
    </>
  );
}
