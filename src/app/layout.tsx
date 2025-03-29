import "./globals.css";

import AppProvider from "@/services/appProvider";

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
