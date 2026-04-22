import type {
  PresetCardOption,
  GotEmCardProps,
  CardLayerFoilConfig,
} from "./types";

/** Default font for card title text (woff served from Google Fonts). */
export const DEFAULT_GOTEM_TITLE_FONT_URL =
  "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff";

// A.k.a. almost zero 😉
export const EPSILLON = 0.001;

export const PresetCards: Record<
  PresetCardOption,
  GotEmCardProps & { bgLayerSrc: string; productLayerSrc: string }
> = {
  "aj1-low-og-game-royal": {
    bgLayerSrc: "./gotem-card/sample-cards/aj-1-low-og-game-royal/bg.png",
    productLayerSrc:
      "./gotem-card/sample-cards/aj-1-low-og-game-royal/product.png",
    productTitle: "Air Jordan 1 Low OG Game Royal",
    frame: {
      titlePosition: { x: -0.3, y: -0.4, z: 0.0225 },
      src: "./gotem-card/frames/card_base_jordan.glb",
    },
  },
  "am95-country-camo": {
    bgLayerSrc: "./gotem-card/sample-cards/am95-country-camo/bg.png",
    productLayerSrc: "./gotem-card/sample-cards/am95-country-camo/product.png",
    productTitle: "Air Max 95 Country Camo",
    frame: {
      titlePosition: { x: -0.3, y: -0.4, z: 0.0225 },
      src: "./gotem-card/frames/card_base_nike.glb",
    },
  },
  "dunk-low-co-what-the": {
    bgLayerSrc: "./gotem-card/sample-cards/dunk-low-co-what-the/bg.png",
    productLayerSrc:
      "./gotem-card/sample-cards/dunk-low-co-what-the/product.png",
    productTitle: "Dunk Low Co. What The",
    frame: {
      titlePosition: { x: -0.3, y: -0.4, z: 0.0225 },
      src: "./gotem-card/frames/card_base_swoosh.glb",
    },
  },
};

// Card layer foil config presets
export const PresetFoilEffect: Record<PresetCardOption, CardLayerFoilConfig> = {
  "aj1-low-og-game-royal": {
    iridescence: 0.18,
    metallicImageUrl: "./gotem-card/foil/hex_dotswoosh.png",
    roughnessImageUrl: "./gotem-card/foil/hex_greyscale.png",
  },
  "am95-country-camo": {
    iridescence: 0.18,
    metallicImageUrl: "./gotem-card/foil/hex_dotswoosh.png",
    roughnessImageUrl: "./gotem-card/foil/hex_greyscale.png",
  },
  "dunk-low-co-what-the": {
    iridescence: 0.18,
    metallicImageUrl: "./gotem-card/foil/hex_dotswoosh.png",
    roughnessImageUrl: "./gotem-card/foil/hex_greyscale.png",
  },
};
