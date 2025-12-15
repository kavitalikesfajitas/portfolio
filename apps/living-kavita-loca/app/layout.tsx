import type { Metadata } from "next";
import { getAppFontVariables } from "@kavita-likes-fajitas/fonts";
import "./globals.css";
import clsx from "clsx";

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
        <footer className="border-t border-neutral-900 dark bg-primary py-4 text-center text-[0.65rem] uppercase tracking-[0.2em] text-neutral-600">
          © {new Date().getFullYear()} Kavita Chaudhry - living kavita loca
        </footer>
      </body>
    </html>
  );
}
