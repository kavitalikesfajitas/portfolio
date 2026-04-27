import type { CameraControlsProps } from "@react-three/drei";
import type { Vector3 } from "three";

/** Compatible with `camera-controls` ACTION flags consumed by drei's CameraControls */
export type ViewerCameraTouches = {
  one: number;
  two: number;
  three: number;
};

export type ViewerCameraMouseButtons = {
  left: number;
  right: number;
  middle: number;
  wheel: number;
};

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
  touches: ViewerCameraTouches;
  mouseButtons: ViewerCameraMouseButtons;
};
