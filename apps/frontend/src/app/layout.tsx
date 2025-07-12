import type { Metadata } from "next";

import _Layout from "@/components/layout/_layout";

import "./globals.css";

export const metadata: Metadata = {
  title: "LIR MVP",
  description: "Sample for Life Insurance Recommendation MVP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased flex flex-col w-full h-auto overflow-x-hidden`}
        suppressHydrationWarning
      >
        <_Layout>{children}</_Layout>
      </body>
    </html>
  );
}
