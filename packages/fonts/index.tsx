import localFont from "next/font/local";
import clsx from "clsx";

const fontHelveticaNeue = localFont({
  src: [
    {
      path: "./fonts/helvetica-neue-5/HelveticaNeueUltraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/helvetica-neue-5/HelveticaNeueUltraLightItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "./fonts/helvetica-neue-5/HelveticaNeueThin.otf",
      weight: "250",
      style: "normal",
    },
    {
      path: "./fonts/helvetica-neue-5/HelveticaNeueThinItalic.otf",
      weight: "250",
      style: "italic",
    },
    {
      path: "./fonts/helvetica-neue-5/HelveticaNeueLight.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/helvetica-neue-5/HelveticaNeueLightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/helvetica-neue-5/HelveticaNeueRoman.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/helvetica-neue-5/HelveticaNeueItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/helvetica-neue-5/HelveticaNeueMedium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/helvetica-neue-5/HelveticaNeueMediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/helvetica-neue-5/HelveticaNeueBold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/helvetica-neue-5/HelveticaNeueBoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/helvetica-neue-5/HelveticaNeueHeavy.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/helvetica-neue-5/HelveticaNeueHeavyItalic.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "./fonts/helvetica-neue-5/HelveticaNeueBlack.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/helvetica-neue-5/HelveticaNeueBlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
  variable: "--font-helvetica-neue",
});

const fontArchivo = localFont({
  src: [
    {
      path: "./fonts/Archivo/Archivo-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/Archivo/Archivo-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "./fonts/Archivo/Archivo-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/Archivo/Archivo-ExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "./fonts/Archivo/Archivo-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Archivo/Archivo-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/Archivo/Archivo-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Archivo/Archivo-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/Archivo/Archivo-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Archivo/Archivo-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/Archivo/Archivo-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/Archivo/Archivo-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  variable: "--font-archivo",
});

const fontRaleway = localFont({
  src: [
    {
      path: "./fonts/railway/Raleway-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/railway/Raleway-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "./fonts/railway/Raleway-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/railway/Raleway-ExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "./fonts/railway/Raleway-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/railway/Raleway-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/railway/Raleway-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/railway/Raleway-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/railway/Raleway-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/railway/Raleway-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/railway/Raleway-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/railway/Raleway-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/railway/Raleway-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/railway/Raleway-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/railway/Raleway-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/railway/Raleway-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "./fonts/railway/Raleway-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/railway/Raleway-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  variable: "--font-raleway",
});

const fontDinCondensed = localFont({
  src: "./fonts/DINCondensed-Bold.woff",
  weight: "700",
  style: "normal",
  display: "swap",
  fallback: ["Arial Narrow", "sans-serif"],
  variable: "--font-din-condensed",
});

const fontLobster = localFont({
  src: "./fonts/Lobster-Regular.ttf",
  weight: "400",
  style: "normal",
  display: "swap",
  fallback: ["cursive"],
  variable: "--font-lobster",
});

const fontMidnightGelactic = localFont({
  src: [
    {
      path: "./fonts/midnight_gelactic/Midnight Gelactic DEMO VERSION.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/midnight_gelactic/Midnight Gelactic Italic DEMO VERSION.otf",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
  fallback: ["serif"],
  variable: "--font-midnight-gelactic",
});

export function getAppFontVariables() {
  return clsx(
    fontHelveticaNeue.variable,
    fontArchivo.variable,
    fontRaleway.variable,
    fontDinCondensed.variable,
    fontLobster.variable,
    fontMidnightGelactic.variable,
  );
}
