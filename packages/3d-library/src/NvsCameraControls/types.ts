import { Event as ThreeEvent } from "three";
import type { Transform3D } from "../../types";

export type ControlsProps<T> = {
  props?: T;
  children?: React.ReactNode;
};

export enum NvsControlsTypes {
  Presentation = "Presentation",
  Orbit = "Orbit",
  Rotate = "Rotate",
  PinchZoom = "PinchZoom",
}

export type NvsControlsKey = keyof typeof NvsControlsTypes;
export type NvsControlsValue = (typeof NvsControlsTypes)[NvsControlsKey];

export type NvsCameraControlsProps = {
  children?: React.ReactNode;
  controls: NvsControlsValue;
  fov?: number;
  near?: number;
  far?: number;
  transform3D?: Transform3D;
  onEnd?: (e?: ThreeEvent) => void;
};
