"use client";
import { Header } from "@/shared/ui/header/header";
import { useState } from "react";
import { SignUpModal } from "@/features/auth/ui/signUpModal/SignUpModal";
import { StoreProvider } from "@/services/store-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function HomePage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <GoogleOAuthProvider clientId="272583913867-t74i019ufdvmarh05jlv8bcu1ak0a6o6.apps.googleusercontent.com">
    
        <Header showAuth={false} onSignUpClick={() => setIsSignUp(true)} />
        {isSignUp && (
          <SignUpModal open={true} onClose={() => setIsSignUp(false)} />
        )}
   
    </GoogleOAuthProvider>
  );
}
