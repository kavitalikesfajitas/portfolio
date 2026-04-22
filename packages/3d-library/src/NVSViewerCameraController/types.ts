import type { CameraControlsProps } from "@react-three/drei";
import type { MouseButtons, Touches } from "camera-controls/dist/types";
import type { Vector3 } from "three";

export type ViewerCameraControllerProps = {
  currentTargetIdx: number;
  targets: ViewerCameraTransforms;
  globalControlsProps?: CameraControlsProps;
  autoRotate?: boolean;
};

export type ControlsConstraints = Pick<
  CameraControlsProps,
  | "minZoom"
  | "maxZoom"
  | "minAzimuthAngle"
  | "maxAzimuthAngle"
  | "minPolarAngle"
  | "maxPolarAngle"
>;

export type ViewerCameraTransform = {
  uiName: string;
  position: Vector3;
  controlsEnabled: boolean;
  zoomEnabled: boolean;
  controlsConstraints?: ControlsConstraints;
  lookAtCenter: Vector3;
  zoom: number;
};

export type ViewerCameraTransforms = ViewerCameraTransform[];

export type UseControlsEventsReturn = {
  touches: Touches;
  mouseButtons: MouseButtons;
};
