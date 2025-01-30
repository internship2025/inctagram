import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Next.js App",
  description: "Using Radix UI with Next.js App Router",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
      <body>
      <Theme>{children}</Theme>
      </body>
      </html>
  );
}
