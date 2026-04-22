import { NvsAuthorableScene } from ".";
import type { StoryFn } from "@storybook/react";
import { NvsCameraControls } from "../NvsCameraControls";
import { defaultControlsConfig } from "../../.storybook/defaultConfigs";
import { Environment } from "@react-three/drei";

type TestItemInSceneProps = {
  envMap?: { url?: string };
};

const TestItemInScene: React.FC<TestItemInSceneProps> = ({ envMap }) => {
  return (
    <div id="nvs-3d-storybook-setup">
      <NvsAuthorableScene shadows>
        {envMap && <Environment files={envMap.url} />}
        <NvsCameraControls {...defaultControlsConfig}>
          <mesh>
            <meshStandardMaterial roughness={0} metalness={0.5} />
            <sphereGeometry />
          </mesh>
          <color attach="background" args={["black"]} />
        </NvsCameraControls>
      </NvsAuthorableScene>
    </div>
  );
};

export default {
  title: "NVS 3D Library/NVS Scene",
  component: TestItemInScene,
  parameters: {
    layout: "fullscreen",
  },
  // Using the decorator, we can set an empty canvas for each story
  // The Setup component has all pieces of a scene (camera, controls, lighting) set to true by default
  // specifying them as false will not include them in the setup of a scene
  decorators: [
    (Story: StoryFn) => {
      return <Story />;
    },
  ],
  tags: ["autodocs"],
  argTypes: {
    envMap: {
      control: {
        type: "select",
      },
      options: ["./tinaj/partpixel_env_map.hdr", "./HERO_HDRI_v01_1k.hdr"],
      description: "This asset defines the lighting behavior in the scene.",
    },
  },
};

export const EmptyScene = {
  args: {
    envMap: "./tinaj/partpixel_env_map.hdr",
  },
  render: ({ envMap }: { envMap: string }) => {
    return (
      <>
        <TestItemInScene envMap={{ url: envMap }} />
      </>
    );
  },
};
