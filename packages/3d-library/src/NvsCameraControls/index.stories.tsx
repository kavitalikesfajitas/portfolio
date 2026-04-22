import { Setup } from "../../.storybook/Setup";
import type { Meta, StoryObj } from "@storybook/react";

import { NvsControlsTypes, NvsCameraControlsProps } from "./types";

const meta: Meta = {
  title: "NVS 3D Library/NVS Camera Controls",
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    controls: {
      description:
        "An object containing a type property indicating the controls to use (can be None/Orbit/Presentation/Rotate)",
    },
    fov: {
      description:
        "Camera frustum vertical field of view, from bottom to top of view, in degrees",
    },
    near: {
      description:
        "Camera frustum near plane (everything before this plane will not be rendered)",
    },
    far: {
      description:
        "Camera frustum far plane (everything beyond this plane will not be rendered)",
    },
    transform3D: {
      description: "Initial transform properties for the camera",
    },
  },
};

export default meta;

// Defaults
const cameraControlsDefaults: Partial<NvsCameraControlsProps> = {
  fov: 45,
  near: 0.1,
  far: 1000,
  transform3D: {
    position: [0, 1, 5],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
};

// Stories
const emptyFrag = <></>;
export const PresentationControls: StoryObj = {
  args: {
    controls: NvsControlsTypes.Presentation,
    ...cameraControlsDefaults,
  },
  render: (args) => (
    <Setup controlsProps={args as NvsCameraControlsProps}>{emptyFrag}</Setup>
  ),
};

export const OrbitControls: StoryObj = {
  args: {
    controls: NvsControlsTypes.Orbit,
    ...cameraControlsDefaults,
  },
  render: (args) => (
    <Setup controlsProps={args as NvsCameraControlsProps}>{emptyFrag}</Setup>
  ),
};

export const RotateControls: StoryObj = {
  args: {
    controls: NvsControlsTypes.Rotate,
    ...cameraControlsDefaults,
  },
  render: (args) => (
    <Setup controlsProps={args as NvsCameraControlsProps}>{emptyFrag}</Setup>
  ),
};

export const PinchZoomControls: StoryObj = {
  args: {
    controls: NvsControlsTypes.PinchZoom,
    ...cameraControlsDefaults,
  },
  render: (args) => (
    <Setup controlsProps={args as NvsCameraControlsProps}>{emptyFrag}</Setup>
  ),
};
