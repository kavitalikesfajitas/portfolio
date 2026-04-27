import type { FC } from "react";
import { FrontSide } from "three";
import { MeshPortalMaterial, Text } from "@react-three/drei";

import Asset3DWithglTFVariants from "../Asset3DWithglTFVariants";
import { DEFAULT_GOTEM_TITLE_FONT_URL } from "./constants";
import type { GotEmCardProps } from "./types";

/**
 * A high level wrapper for the GotemCard component
 * @param {GotEmCardProps} props - The props for the GotemCard component
 * @returns {JSX.Element} A React element representing the GotemCard component
 *
 * @example
 * ```tsx
 * <GotEmCard frame={{ src: "test.glb", titlePosition: {x: 0, y: 0, z: 0} }} productTitle="YO">
 *  <mesh>
 *   <boxGeometry args={[1, 1, 1]} />
 *   <meshStandardMaterial color="red" />
 *  </mesh>
 * </GotEmCard>
 * ```
 */
export const GotEmCard: FC<GotEmCardProps> = (props) => {
  /**
   * @todo figure out a way to automagically calculate the aspect ratio of the frame (for now, since all frames are the same this should work)
   * The ratio here is based on the layer texture's width / height (which is 600 / 832)
   * @see https://www.figma.com/design/f0dorHQzsdIuUAWghqCo54/Collectibles?node-id=1-1374&t=V1VRnFEns7SjrepB-1
   */
  const frameAspect = props.frame.portalWidthHeightRatio ?? 0.7211538462;
  const titleFont = props.titleFontUrl ?? DEFAULT_GOTEM_TITLE_FONT_URL;

  return (
    <group>
      <Asset3DWithglTFVariants
        asset={{ url: props.frame.src }}
        currentVariant={props.frame.variant}
      />

      {props.productTitle && (
        <Text
          font={titleFont}
          anchorX="left"
          anchorY="top"
          position={[
            props.frame.titlePosition.x,
            props.frame.titlePosition.y,
            props.frame.titlePosition.z,
          ]}
          scale={0.03}
          maxWidth={11}
          letterSpacing={0.01}
        >
          <meshBasicMaterial
            side={FrontSide}
            toneMapped={false}
            attach={"material"}
          />
          {props.productTitle.toUpperCase()}
        </Text>
      )}

      <mesh scale={0.97}>
        <planeGeometry args={[frameAspect, 1]} />
        <MeshPortalMaterial
          ref={props.portalRef}
          transparent
          blur={0}
          resolution={512}
        >
          {props.children}
        </MeshPortalMaterial>
      </mesh>
    </group>
  );
};
