
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ATL SMS | Atlanta Business Messaging",
  description:
    "A simple SMS workspace for Atlanta businesses, powered by Telnyx.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
