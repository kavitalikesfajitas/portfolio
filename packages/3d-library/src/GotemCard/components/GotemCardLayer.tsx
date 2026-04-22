import { type FC, useRef } from "react";
import { useTexture } from "@react-three/drei";
import { Mesh, MeshPhysicalMaterial } from "three";

// Hooks
import {
  MaterialMetalness,
  MaterialRoughness,
  useHtmlImageAspectRatio,
  useLayerFoilEffect,
} from "../hooks";

// Types
import type { CardLayerFoilConfig } from "../types";

type GotEmCardLayerProps = {
  zOffset: number;
  src: string;
  foilConfig?: CardLayerFoilConfig;
  materialType?: "lit" | "unlit";
};

const LitLayer: FC<GotEmCardLayerProps> = (props) => {
  const ref = useRef<Mesh>(null);
  const materialRef = useRef<MeshPhysicalMaterial>(null);
  const texture = useTexture(props.src);

  // When it's a lit material that needs foil effect - this hook takes care of that (based on LayerFoilConfig and material ref)
  useLayerFoilEffect(materialRef, props.foilConfig!);

  // Aspect ratio of the texture
  const textureImageElement = texture.image as HTMLImageElement | null;
  const frameAspect = useHtmlImageAspectRatio(textureImageElement);

  return (
    <mesh ref={ref} position-z={props.zOffset}>
      <planeGeometry args={[frameAspect, 1]} />
      <meshPhysicalMaterial ref={materialRef} transparent map={texture} />

      {props.foilConfig?.metallicImageUrl && (
        <MaterialMetalness
          textureUrl={props.foilConfig.metallicImageUrl}
          materialRef={materialRef}
        />
      )}

      {props.foilConfig?.roughnessImageUrl && (
        <MaterialRoughness
          textureUrl={props.foilConfig.roughnessImageUrl}
          materialRef={materialRef}
        />
      )}
    </mesh>
  );
};

const UnlitLayer: FC<GotEmCardLayerProps> = (props) => {
  const ref = useRef<Mesh>(null);
  const texture = useTexture(props.src, () => null);

  // Aspect ratio of the texture
  const textureImageElement = texture.image as HTMLImageElement | null;
  const frameAspect = useHtmlImageAspectRatio(textureImageElement);

  return (
    <mesh ref={ref} position-z={props.zOffset}>
      <planeGeometry args={[frameAspect, 1]} />
      <meshBasicMaterial transparent map={texture} />
    </mesh>
  );
};

export const GotEmCardLayer: FC<GotEmCardLayerProps> = (props) => {
  return props.foilConfig ? <LitLayer {...props} /> : <UnlitLayer {...props} />;
};
