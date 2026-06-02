import localFont from "next/font/local";
import { Inter } from "next/font/google";
import clsx from "clsx";

const fontInter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
  variable: "--font-inter",
});

const fontMidnightGelactic = localFont({
  src: [
    {
      path: "../../fonts/midnight_gelactic/Midnight Gelactic.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/midnight_gelactic/Midnight Gelactic Italic.otf",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
  fallback: ["serif"],
  variable: "--font-midnight-gelactic",
});

const fontLobster = localFont({
  src: [
    {
      path: "../../fonts/Lobster-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  fallback: ["cursive", "serif"],
  variable: "--font-lobster",
});

export function getAppFontVariablesForLivingKavitaLoca() {
  return clsx(
    fontInter.variable,
    fontMidnightGelactic.variable,
    fontLobster.variable,
  );
}
