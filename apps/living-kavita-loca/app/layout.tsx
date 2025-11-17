import type { Metadata } from "next";
import { getAppFontVariables } from "@kavita-likes-fajitas/fonts";
import "./globals.css";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "Living Kavita Loca",
  description: "Living Kavita Loca",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVariables = getAppFontVariables();
  return (
    <html lang="en">
      <body className={clsx(fontVariables, "antialiased")}>{children}</body>
    </html>
  );
}
