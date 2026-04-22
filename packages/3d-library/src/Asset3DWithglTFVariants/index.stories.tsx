import type { StoryFn } from "@storybook/react";
import { Environment, Html } from "@react-three/drei";
import { Suspense, useState } from "react";

import Asset3DWithglTFVariants from ".";

import { MathUtils } from "three";
import type { NvsAuthorableScene } from "../NvsAuthorableScene";
import type { NvsCameraControls } from "../NvsCameraControls";
import {
  NvsControlsTypes,
  type NvsCameraControlsProps,
} from "../NvsCameraControls/types";
import { type SceneAssetProps, Asset3DAnimationType } from "../types/Assets3D";
import { Canvas } from "@react-three/fiber";

const Author;

const VariantsDemo = ({ ...props }: SceneAssetProps) => {
  const [currentVariant, setCurrentVariant] = useState<string>();
  const [variants, setVariants] = useState<string[]>();

  return (
    <>
      {/* A hacky way to show the variants on screen and select them for demo purposes */}
      {variants?.length &&
        variants.map((variant, idx) => (
          <Html
            key={idx}
            position-x={0.25}
            position-y={MathUtils.mapLinear(idx, 0, variants.length, -0.5, 0.5)}
          >
            <button
              key={variant}
              className="btn m-2 bg-gray-800 p-2 text-white"
              onClick={() => {
                setCurrentVariant(variant);
              }}
            >
              {variant}
            </button>
          </Html>
        ))}

      <Asset3DWithglTFVariants
        {...props}
        onVariantsLoaded={setVariants}
        currentVariant={currentVariant}
      />
    </>
  );
};

export default {
  title: "NVS 3D Library/3D Asset/glTF Variants",
  component: Asset3DWithglTFVariants,
  parameters: {
    layout: "fullscreen",
  },

  decorators: [
    (Story: StoryFn) => {
      // Controls setup
      const controlProps = {
        fov: 75,
        near: 0.1,
        far: 1000,
        transform3D: {
          position: [0, 0, 2],
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
        },
        controls: NvsControlsTypes.PinchZoom,
      } as NvsCameraControlsProps;

      // Environment map setup
      const envMap = {
        url: "https://nvs-static-3d-assets.s3.us-west-2.amazonaws.com/hdris/Stomp_1k_3x.hdr",
      };

      return (
        <div className="absolute left-0 top-0 h-dvh w-screen">
            <Canvas {...props} shadows>
      <Suspense fallback={<CubeLoader />}>{children}</Suspense>
  
            <color attach="background" args={["#111111"]} />
            <Environment files={envMap.url} />
            <NvsCameraControls {...controlProps}>
              <Story />
            </NvsCameraControls>
          </NvsAuthorableScene>
        </div>
      );
    },
  ],
  tags: ["autodocs"],
};

export const FCAvatarVariants = {
  args: {
    transform3D: {
      position: [-0.5, -1, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    },
    asset: {
      url: "./ea/models/MALE_0905.glb",
    },
    animation: {
      interactionType: "autoplay",
      animation: {
        actionName: "animation_0",
        __typename: Asset3DAnimationType.KeyframeAnimation,
      },
      name: "COOL ANIMATION",
    },
  },
  render: VariantsDemo,
};

export const TestShoe = {
  args: {
    transform3D: {
      position: [-0.5, -0.5, 0],
      rotation: [0, 0, 0],
      scale: [5, 5, 5],
    },
    asset: {
      url: "./MaterialsVariantsShoe-v2.glb",
    },
  },
  render: VariantsDemo,
};
