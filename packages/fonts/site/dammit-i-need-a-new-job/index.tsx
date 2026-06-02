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

const fontOverpassMono = localFont({
  src: [
    {
      path: "../../fonts/overpass_mono/OverpassMono-VariableFont_wght.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  display: "swap",
  fallback: ["monospace"],
  variable: "--font-overpass-mono",
});

const fontRampartOne = localFont({
  src: [
    {
      path: "../../fonts/rampart_one/RampartOne-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  fallback: ["serif"],
  variable: "--font-rampart-one",
});

const fontLondrinaShadow = localFont({
  src: [
    {
      path: "../../fonts/londrina-shadow/LondrinaShadow-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  fallback: ["cursive"],
  variable: "--font-londrina-shadow",
});

export function getAppFontVariablesForDammit() {
  return clsx(
    fontInter.variable,
    fontMidnightGelactic.variable,
    fontLobster.variable,
    fontOverpassMono.variable,
    fontRampartOne.variable,
    fontLondrinaShadow.variable,
  );
}
