import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Construction App",
  description: "Construction app built with Next.js",
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
