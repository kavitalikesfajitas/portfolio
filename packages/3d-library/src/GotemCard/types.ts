import type { ComponentRef, PropsWithChildren } from "react";

/** Instance type for drei's `<MeshPortalMaterial ref={...} />` */
export type GotEmPortalMaterialHandle = ComponentRef<
  (typeof import("@react-three/drei"))["MeshPortalMaterial"]
>;

/*
String union to define all frameType keys
In the future Contentful would key into the frameType and pull the correct frame texture (i.e. "dotswoosh" | "fortnite-nike" | "fortnite-jordan"...etc)
@see constants.ts for lookup
**/
export type CardFrameOption = "dotswoosh" | "custom";

export type CardFrameConfig = {
  titlePosition: {
    x: number;
    y: number;
    z: number;
  };
  src: string;
  /** KHR_materials_variants name, when the frame glTF exposes variants */
  variant?: string;
  portalWidthHeightRatio?: number;
};

type CardDynamicText = {
  productTitle?: string;
  /** URL for drei `<Text font=...>` (woff/woff2/ttf). */
  titleFontUrl?: string;
};

export type GotEmCardProps = PropsWithChildren<{
  frame: CardFrameConfig;
  portalRef?: React.RefObject<GotEmPortalMaterialHandle | null>;
}> &
  CardDynamicText;

// Some preset options for premade cards
export type PresetCardOption =
  | "aj1-low-og-game-royal"
  | "am95-country-camo"
  | "dunk-low-co-what-the";

export type CardLayerFoilConfig = {
  // Properties for the foil effect
  iridescence: number;

  // Assets required to create the effect
  metallicImageUrl?: string;
  roughnessImageUrl?: string;
};
