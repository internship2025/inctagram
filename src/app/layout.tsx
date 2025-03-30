import { Metadata } from "next";
import "./globals.css";

import AppProvider from "@/services/appProvider";

export const metadata: Metadata = {
  title: 'Instagram',
  description: 'social network'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang={"en"}>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
