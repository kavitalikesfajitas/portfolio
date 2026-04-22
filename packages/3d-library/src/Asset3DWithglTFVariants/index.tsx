import { useEffect, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils";

import { useVariants } from "./hooks";

import type { Asset3DWithglTFVariantsProps } from "./types";
import type { PrimitiveProps } from "@react-three/fiber";
import type { SceneAssetProps } from "../types/Assets3D";

type PrimitivePropsWithoutObject = Omit<PrimitiveProps, "object">;

const Asset3DWithglTFVariants: React.FC<
  SceneAssetProps & Asset3DWithglTFVariantsProps & PrimitivePropsWithoutObject
> = ({
  asset,
  transform3D,
  animation,
  currentVariant,
  onVariantsLoaded,
  onVariantChange,
  ...primitiveProps
}) => {
  const gltf = useGLTF(asset.url);

  // We have to clone the scene to avoid caching which causes the model to dissapear
  const clonedScene = useMemo(
    () => SkeletonUtils.clone(gltf.scene),
    [gltf.scene],
  );
  const { actions } = useAnimations(gltf.animations, clonedScene);
  const { variants, selectVariant } = useVariants(
    gltf,
    clonedScene,
    onVariantChange,
  );

  const hasKeyframeAnimation =
    Object.values(actions).length && animation?.animation.actionName;
  const shouldAutoplay = animation?.interactionType === "autoplay";

  // If the animation is a keyframe animation and should autoplay play it
  useEffect(() => {
    if (hasKeyframeAnimation && shouldAutoplay)
      actions[animation.animation.actionName!]?.play();
  }, [hasKeyframeAnimation, shouldAutoplay, actions]);

  // If the variants exist and the onVariantsLoaded callback is provided call it and pass the variants array
  useEffect(() => {
    if (variants && onVariantsLoaded) onVariantsLoaded(variants);
  }, [variants, onVariantsLoaded]);

  // If the variant prop changes and it exists in the variants array change it
  useEffect(() => {
    if (currentVariant && variants?.includes(currentVariant))
      selectVariant(currentVariant);
  }, [currentVariant, selectVariant, variants]);

  return (
    <primitive
      {...primitiveProps}
      object={clonedScene}
      position={transform3D?.position}
      rotation={transform3D?.rotation}
      scale={transform3D?.scale}
    />
  );
};

export default Asset3DWithglTFVariants;
