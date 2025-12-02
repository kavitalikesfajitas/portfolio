import { useTexture, useVideoTexture } from "@react-three/drei";
import { forwardRef, type ForwardedRef, type PropsWithChildren } from "react";
import type { ShaderMaterial } from "three";

type MaterialProps = PropsWithChildren<{
  option: any;
  i: number;
  itemVideo: string;
  video: boolean;
  itemTexture: string;
}>;

// list of supported materials for the carousel
export const Material = forwardRef<ShaderMaterial, MaterialProps>(
  (props, ref) => {
    console.log(props.itemTexture, props.video, props.itemVideo);
    const posterTexture = useTexture(props.itemTexture);
    // Always call the hook unconditionally, pass null if no video
    // const videoTexture = useVideoTexture(
    //   props.video && props.itemVideo ? props.itemVideo : null,
    //   {
    //     muted: true,
    //     loop: true,
    //     start: true,
    //   },
    // );
    const texture = posterTexture;
    // props.video && props.itemVideo ? videoTexture : posterTexture;
    switch (props.option.type) {
      case "wavy":
        return (
          <>
            {/* @ts-expect-error ShaderMaterial from R3F/drei doesn't work well with TS */}
            <waveShaderMaterial
              ref={ref}
              uTexture={texture}
              uFactor={props.option.params.noiseFactor}
              uNoiseFrequency={props.option.params.noiseFreq}
              uNoiseAmplitude={props.option.params.noiseAmp}
            />
          </>
        );
      default:
        return <></>;
    }
  },
);

Material.displayName = "Material";
