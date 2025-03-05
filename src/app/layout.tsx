import "./globals.css";
import { StoreProvider } from "@/services/store-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleOAuthProvider clientId="272583913867-t74i019ufdvmarh05jlv8bcu1ak0a6o6.apps.googleusercontent.com">
        <StoreProvider>
          <body>{children}</body>
        </StoreProvider>
      </GoogleOAuthProvider>
    </html>
  );
}
