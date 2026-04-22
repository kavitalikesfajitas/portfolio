import type { StoryFn } from "@storybook/react";
import AuthorableProduct from ".";
import { AuthorableProductProps } from "./types";
import TinaJSceneMock from "../../TINAJSceneMockData";
import PartPixelMock from "../../PartPixelSceneMockData";

export default {
  title: "NVS 3D Library/Authorable Product",
  component: AuthorableProduct,
  parameters: {
    layout: "fullscreen",
  },

  decorators: [
    (Story: StoryFn) => {
      return <Story />;
    },
  ],
  tags: ["autodocs"],
  argTypes: {
    hdri: {
      description:
        "The HDRI to use for the scene. This asset defines the lighting behavior in the scene.",
    },
    loaderType: {
      description: "The loader type defines the loading behavior for the scene",
    },
    background: {
      description: "The background color, or asset to use for the scene",
    },
    cameraControls: {
      description: "This controls the camera behavior in the scene",
    },
    lights: {
      description:
        "The lights interact with assets in the scene to give them color and make them more visible",
    },
    assets3d: {
      description:
        "The assets to use for the scene. These assets can be 3D models with animations.",
    },
  },
};

const PartPixelSceneMockData = PartPixelMock.data.scene3D;
const PartPixelSceneMockArgs = {
  hdri: PartPixelSceneMockData.hdri,
  loaderType: PartPixelSceneMockData.loaderType,
  background: PartPixelSceneMockData.background,
  cameraControls: PartPixelSceneMockData.cameraControls,
  lights: PartPixelSceneMockData.lightsCollection.items,
  assets3d: PartPixelSceneMockData.assets3DCollection.items,
};

export const PartPixelMockScene = {
  args: PartPixelSceneMockArgs,
  render: ({ ...props }: AuthorableProductProps) => {
    return (
      <div id="nvs-3d-storybook-setup">
        <AuthorableProduct {...props} />
      </div>
    );
  },
};

const TinaJSceneMockData = TinaJSceneMock.data.scene3D;
const TinaJSceneMockArgs = {
  hdri: TinaJSceneMockData.hdri,
  loaderType: TinaJSceneMockData.loaderType,
  background: TinaJSceneMockData.background,
  cameraControls: TinaJSceneMockData.cameraControls,
  lights: TinaJSceneMockData.lightsCollection.items,
  assets3d: TinaJSceneMockData.assets3DCollection.items,
};

export const TinaJSceneMockScene = {
  args: TinaJSceneMockArgs,
  render: ({ ...props }: AuthorableProductProps) => {
    return (
      <div id="nvs-3d-storybook-setup">
        <AuthorableProduct {...props} />
      </div>
    );
  },
};
