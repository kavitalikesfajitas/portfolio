import React, { useEffect } from "react";
import { PerspectiveCamera } from "@react-three/drei";

import type { CameraControlsProps } from "./types";
import { getControlsFromType } from "./utils";
import { useIsAutoplayAndVisible } from "../../hooks";
import { useThree } from "@react-three/fiber";

export const CameraControls: React.FC<CameraControlsProps> = ({
  children,
  controls,
  fov,
  near,
  far,
  transform3D,
  onEnd,
}: CameraControlsProps) => {
  const { Controls, defaultProps } = getControlsFromType(controls);

  // // Enable/disable events based on autoplay (used for mobile devices in unexpanded modal) to prevent scroll-hijacking
  // const isAutoplayAndVisible = useIsAutoplayAndVisible();
  // const eventsManager = useThree((state) => state.events);
  // useEffect(() => {
  //   eventsManager.enabled = !isAutoplayAndVisible;
  // }, [isAutoplayAndVisible, eventsManager]);

  return (
    <>
      {Controls ? (
        <Controls props={{ ...defaultProps, onEnd }}>{children}</Controls>
      ) : (
        children
      )}
    </>
  );
};
