import { useTexture, useVideoTexture } from "@react-three/drei";
import { forwardRef, type PropsWithChildren } from "react";
import { type Texture, type ShaderMaterial } from "three";

type MaterialProps = PropsWithChildren<{
  option: {
    noiseFactor: number;
    noiseFreq: number;
    noiseAmp: number;
  };
}>;

export const VideoMaterial = forwardRef<
  ShaderMaterial,
  MaterialProps & { video: string }
>((props, ref) => {
  const videoTexture = useVideoTexture(props.video, {
    muted: true,
    loop: true,
    start: true,
  });
  return <Material itemTexture={videoTexture} ref={ref} {...props} />;
});
VideoMaterial.displayName = "VideoMaterial";

export const TextureMaterial = forwardRef<
  ShaderMaterial,
  MaterialProps & { itemTexture: string }
>(({ itemTexture, ...props }, ref) => {
  const posterTexture = useTexture(itemTexture);
  return <Material itemTexture={posterTexture} ref={ref} {...props} />;
});
TextureMaterial.displayName = "TextureMaterial";

// list of supported materials for the carousel
export const Material = forwardRef<
  ShaderMaterial,
  MaterialProps & { itemTexture: Texture<unknown> }
>(({ itemTexture, option }, ref) => {
  return (
    <>
      {/* @ts-expect-error ShaderMaterial from R3F/drei doesn't work well with TS */}
      <waveShaderMaterial
        ref={ref}
        uTexture={itemTexture}
        uFactor={option.noiseFactor}
        uNoiseFrequency={option.noiseFreq}
        uNoiseAmplitude={option.noiseAmp}
      />
    </>
  );
});

Material.displayName = "Material";
