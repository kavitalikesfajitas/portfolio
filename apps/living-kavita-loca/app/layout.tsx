import type { Metadata } from "next";
import { getAppFontVariables } from "@kavita-likes-fajitas/fonts";
import "./globals.css";
import clsx from "clsx";
import { Footer } from "@kavita-likes-fajitas/ui-library/Navigation/Footer";

export const metadata: Metadata = {
  title: "Living Kavita Loca",
  description:
    "Portfolio and personal website of Kavita - software engineer and creative developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVariables = getAppFontVariables();
  return (
    <html lang="en">
      <body className={clsx(fontVariables, "antialiased")}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
