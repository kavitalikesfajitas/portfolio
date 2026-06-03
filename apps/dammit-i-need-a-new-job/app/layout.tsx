import type { Metadata } from "next";
import "./globals.css";
import { getAppFontVariablesForDammit } from "@kavita-likes-fajitas/fonts";
import clsx from "clsx";
import { Footer } from "@kavita-likes-fajitas/ui-library/Navigation/Footer";
export const metadata: Metadata = {
  title: "Dammit I Need A New Job",
  description: "Dark Layoff Humor",
  icons: {
    icon: "/images/dammit-flame.png",
    shortcut: "/images/dammit-flame.png",
    apple: "/images/dammit-flame.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVariables = getAppFontVariablesForDammit();
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className={clsx("min-h-full flex flex-col")}>
        {children}
        <Footer className="bg-cream-1000! text-gray-950!" />
      </body>
    </html>
  );
}
