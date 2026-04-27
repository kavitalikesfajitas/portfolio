import { useEffect, useMemo } from "react";
import type { RefObject } from "react";

// Types
import { type MeshPhysicalMaterial } from "three";
import type { CardLayerFoilConfig } from "./types";
import { useTexture } from "@react-three/drei";

export const useHtmlImageAspectRatio = (image: HTMLImageElement | null) => {
  return useMemo(() => {
    if (!image) return 1;

    return image.width / image.height;
  }, [image]);
};

export const useLayerFoilEffect = (
  materialRef: RefObject<MeshPhysicalMaterial | null>,
  foilConfig: CardLayerFoilConfig,
) => {
  // Time for material surgery
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!materialRef.current) return;

    // Iridescence assignment
    materialRef.current.iridescence = foilConfig.iridescence;
    materialRef.current.iridescenceIOR = 1.8;
    materialRef.current.iridescenceThicknessRange = [100, 400];

    // Tell three.js to re-compile the material
    materialRef.current.needsUpdate = true;
  }, [materialRef.current, foilConfig]);
};

export const MaterialMetalness = ({
  textureUrl,
  materialRef,
}: {
  textureUrl: string;
  materialRef: RefObject<MeshPhysicalMaterial | null>;
}) => {
  const texture = useTexture(textureUrl);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.metalnessMap = texture;
      materialRef.current.metalness = 1.0;
      materialRef.current.needsUpdate = true;
    }
  }, [texture, materialRef]);

  return null;
};

export const MaterialRoughness = ({
  textureUrl,
  materialRef,
}: {
  textureUrl: string;
  materialRef: RefObject<MeshPhysicalMaterial | null>;
}) => {
  const texture = useTexture(textureUrl);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.roughnessMap = texture;
      materialRef.current.roughness = 1.0;
      materialRef.current.needsUpdate = true;
    }
  }, [texture, materialRef]);

  return null;
};
